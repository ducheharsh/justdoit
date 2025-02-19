'use client'
import ProtectedRoute from "@/components/provider/protectedRoute-provider"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    router.push('/auth')
  }, [router])

  return (
    <ProtectedRoute>
      <div>Loading...</div>
    </ProtectedRoute>
  )
}