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
        const { payment_intent, amount_total, status, customer_email } = session
        const metadata = session.metadata as {
            userId: string
            userEmail?: string
            userName?: string
            clerkUserId?: string
            amount?: string
            currency?: string
            service?: string
        }

        console.log('Processing payment webhook:', {
            sessionId: session.id,
            paymentIntent: payment_intent,
            amount: amount_total,
            status,
            customerEmail: customer_email,
            metadata
        })

        if (!payment_intent || amount_total == null || !status || !metadata.userId) {
            console.error('Missing required session data:', {
                hasPaymentIntent: !!payment_intent,
                hasAmount: amount_total != null,
                hasStatus: !!status,
                hasUserId: !!metadata.userId,
                session
            })
            return NextResponse.json({ error: 'Missing required session data' }, { status: 400 })
        }

        try {
            await createPayment({
                userId: metadata.userId,
                paymentIntentId: payment_intent.toString(),
                status: status,
                amount: amount_total,
            })

            console.log('Payment successfully saved to database:', {
                userId: metadata.userId,
                paymentIntentId: payment_intent.toString(),
                amount: amount_total
            })
        } catch (error) {
            console.error('Error saving payment to database:', error)
            return NextResponse.json({ error: 'Error saving payment' }, { status: 500 })
        }
    }

    return NextResponse.json({ received: true })
}
