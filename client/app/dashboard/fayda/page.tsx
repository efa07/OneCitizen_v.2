"use client"

import React, { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BadgeCheck, RefreshCcw, UserCircle2 } from "lucide-react"
import Image from "next/image"

type UserInfo = {
  name: string
  faydaId: string
  birthdate: string
  gender: string
  region: string
  picture?: string
}

export default function FaydaPage() {
  const [user, setUser] = useState<UserInfo | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("userInfo")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setUser({
          name: parsed.name,
          faydaId: parsed.faydaId,
          birthdate: parsed.birthdate,
          gender: parsed.gender,
          region: parsed.region,
          picture: parsed.picture,
        })
      } catch (err) {
        console.error("Invalid userInfo data:", err)
      }
    }
  }, [])

  const handleSync = () => {
    alert("Syncing with Fayda...")
    // TODO: Add actual sync logic/API call
  }

  if (!user) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <p className="text-muted-foreground">Loading Fayda info...</p>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-primary">My Fayda Info</h1>
      <p className="text-muted-foreground mb-8">
        View your digital identity and sync updated data from the Fayda system.
      </p>

      <Card className="mb-6">
        <CardHeader className="flex items-center gap-4">
          {user.picture ? (
           <div className="w-[80px] h-[80px] rounded-full overflow-hidden border shadow-sm">
  <Image
    src={user.picture}
    alt="Profile"
    width={80}
    height={80}
    className="object-cover"
  />
</div>

          ) : (
            <UserCircle2 className="w-10 h-10 text-primary" />
          )}

          <div>
            <CardTitle className="text-xl">{user.name}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Fayda ID: {user.faydaId || "N/A"}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <span className="font-medium text-foreground">DOB:</span>{" "}
              {user.birthdate || "Unknown"}
            </li>
            <li>
              <span className="font-medium text-foreground">Gender:</span>{" "}
              {user.gender || "Unknown"}
            </li>
            <li>
              <span className="font-medium text-foreground">Region:</span>{" "}
              {user.region || "Unknown"}
            </li>
            <li>
              <span className="font-medium text-foreground">Status:</span>{" "}
              <BadgeCheck className="inline w-4 h-4 text-green-600" /> Verified
            </li>
          </ul>

          <div className="mt-6 flex gap-4">
            <Button onClick={handleSync}>
              <RefreshCcw className="w-4 h-4 mr-2" /> Sync with Fayda
            </Button>
            <Button variant="secondary" disabled>
              Update Info (Coming Soon)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
