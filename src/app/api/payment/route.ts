import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const domain = process.env.NEXT_PUBLIC_DOMAIN

export async function POST(request: NextRequest) {
    const { userId } = await auth()

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let user
    try {
        const client = await clerkClient()
        user = await client.users.getUser(userId)
    } catch (error) {
        console.error('Failed to fetch user from Clerk:', error)
        return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 })
    }

    const { amount }: { amount: number } = await request.json()

    if (!amount || amount <= 0) {
        return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }

    const primaryEmail = user.emailAddresses.find(email => email.id === user.primaryEmailAddressId)?.emailAddress
    const userEmail = primaryEmail || user.emailAddresses[0]?.emailAddress

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: userEmail,
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Voctext Support',
                            description: 'Support for Voctext audio transcription service',
                        },
                        unit_amount: amount * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${domain}/?payment_session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${domain}/`,
            metadata: {
                userId: userId,
                userEmail: userEmail || '',
                userName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Unknown',
                clerkUserId: userId,
                amount: amount.toString(),
                currency: 'usd',
                service: 'voctext_support'
            },
        })

        return NextResponse.json({ sessionId: session.id }, { status: 200 })
    } catch (error) {
        console.error(error)

        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}