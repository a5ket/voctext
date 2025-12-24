'use client'

import { Button } from '@/components/ui/button'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Text } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function MainNav() {
  const router = useRouter()

  return (
    <nav className="flex justify-end gap-3 min-h-[40px]">
      <SignedOut>
        <SignInButton>
          <Button>Sign In</Button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <Button
          variant="outline"
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-2"
        >
          <Text className="w-4 h-4" />
          Dashboard
        </Button>
        <UserButton />
      </SignedIn>
    </nav>
  )
}