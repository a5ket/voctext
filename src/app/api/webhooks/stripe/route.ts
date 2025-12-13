import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { createPayment } from '@/lib/data'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-12-18.acacia',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
    const body = await request.text()
    const headersList = await headers()
    const signature = headersList.get('stripe-signature')

    if (!signature) {
        return NextResponse.json({ error: 'No signature' }, { status: 400 })
    }

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
        console.error(`Webhook signature verification failed: ${(err as Error).message}`)
        return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 })
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session
        const { payment_intent, amount_total, status } = session
        const { userId } = session.metadata as { userId: string }

        if (!payment_intent || amount_total == null || !status || !userId) {
            console.error('Missing session data', session)
            return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
        }

        try {
            await createPayment({
                userId,
                paymentIntentId: payment_intent.toString(),
                status: status,
                amount: amount_total,
            })
        } catch (error) {
            console.error('Error saving payment to database:', error)
            return NextResponse.json({ error: 'Error saving payment' }, { status: 500 })
        }
    }

    return NextResponse.json({ received: true })
}
