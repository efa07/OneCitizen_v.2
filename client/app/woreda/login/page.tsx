"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function WoredaLoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async () => {
    setLoading(true)
    setError("")

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/woreda/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (res.ok) {
        localStorage.setItem("woredaToken", data.token)
        router.push("/woreda/dashboard")
      } else {
        setError(data.error || "Login failed.")
      }
    } catch (err) {
      setError("Something went wrong.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Woreda Worker Login</h1>
            <p className="text-muted-foreground text-sm">
              Login to process service requests
            </p>
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-100 p-2 rounded">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="worker@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              onClick={handleLogin}
              className="w-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </div>
      </div>

      {/* Right: Login Logo */}
      <div className="hidden md:block relative">
        <Image
          src="/login_logo.jpg"
          alt="Woreda Login"
          fill
          className="object-cover"
        />
      </div>
    </div>
  )
}
