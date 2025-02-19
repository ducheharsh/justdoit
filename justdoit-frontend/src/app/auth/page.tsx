'use client'
import { ArrowRight } from "lucide-react"
import { AuthForm } from "@/components/custom/auth-form"
import { useEffect, useState } from "react"

export default function AuthPage() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <ArrowRight className="size-5" />
            </div>
            JustDoIt
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <AuthForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 opacity-90"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h2 className="text-4xl font-bold mb-4">Make It Happen</h2>
          <p className="text-xl max-w-md text-center">
            Stop procrastinating, start achieving. JustDoIt: Your personal motivator for turning plans into action.
          </p>
        </div>
      </div>
    </div>
  )
}

