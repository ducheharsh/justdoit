'use client'
import ProtectedRoute from "@/components/provider/protectedRoute-provider"
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  router.push('/auth')
  return (
    <ProtectedRoute>
      <div>Loading...</div>
    </ProtectedRoute>
  )
}