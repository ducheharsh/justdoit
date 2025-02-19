"use client"

import type React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils/cn"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Zap, CheckCircle } from "lucide-react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  signInCredentialsSchema,
  SignUpCredentials,
  SignInCredentials,
  signUpCredentialsSchema
} from "@/types"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useSignIn, useSignUp } from "@/hooks/api/auth.action"

export function AuthForm({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
  const [isLogin, setIsLogin] = useState(true)
  const signIn = useSignIn()
  const signUp = useSignUp()
  const router = useRouter()

  type FormData = SignInCredentials | SignUpCredentials

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(isLogin ? signInCredentialsSchema : signUpCredentialsSchema),
    mode: 'onChange',
  })

  const onSubmit = async (data: FormData) => {
    try {
      if (isLogin) {
        await signIn.mutateAsync(data as SignInCredentials)
        toast.success("Logged in successfully!")
        router.push("/dashboard")
      } else {
        await signUp.mutateAsync(data as SignUpCredentials)
        toast.success("Account created successfully!")
        router.push("/dashboard")
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred")
    }
  }

  const toggleAuthMode = () => {
    setIsLogin(!isLogin)
    reset() // Clear form when switching modes
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold text-primary">
          {isLogin ? "Let's Get Moving!" : "Join the Action!"}
        </h1>
        <p className="text-balance text-sm text-muted-foreground">
          {isLogin
            ? "Log in and start conquering your tasks!"
            : "Sign up now and turn your 'to-dos' into 'dones'!"
          }
        </p>
      </div>

      <div className="grid gap-4">
        {!isLogin && (
          <div className="grid gap-2">
            <Label htmlFor="username">Your Name</Label>
            <Input
              id="username"
              placeholder="Action Taker"
              {...register("username" as keyof FormData)}
            />
            {'username' in errors && errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>
        )}

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="go@justdoit.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            {isLogin && (
              <a
                href="#"
                className="ml-auto text-sm text-primary underline-offset-4 hover:underline"
              >
                Forgot password?
              </a>
            )}
          </div>
          <Input
            id="password"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={signIn.isPending || signUp.isPending}
        >
          {isLogin ? (
            <>
              <Zap className="mr-2 h-4 w-4" /> Let&apos;s Go!
            </>
          ) : (
            <>
              <CheckCircle className="mr-2 h-4 w-4" /> Start Doing
            </>
          )}
        </Button>
      </div>

      <div className="text-center text-sm">
        {isLogin ? "New to getting things done? " : "Already a doer? "}
        <button
          type="button"
          onClick={toggleAuthMode}
          className="text-primary underline underline-offset-4 hover:text-primary/90"
        >
          {isLogin ? "Sign up now" : "Log in here"}
        </button>
      </div>
    </form>
  )
}