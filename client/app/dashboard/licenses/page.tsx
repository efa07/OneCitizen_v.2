"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Car, BriefcaseBusiness, ShieldCheck } from "lucide-react"

const licenseServices = [
  {
    title: "Driver's License",
    description: "View, renew, or apply for your driving license.",
    icon: <Car className="w-6 h-6 text-primary" />,
    slug: "drivers-license",
  },
  {
    title: "Business License",
    description: "Manage your business license registration and status.",
    icon: <BriefcaseBusiness className="w-6 h-6 text-primary" />,
    slug: "business-license",
  },
  {
    title: "Firearm License",
    description: "Request or renew your firearm ownership license.",
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    slug: "firearm-license",
  },
]

export default function LicensesPage() {
  const router = useRouter()

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-primary">Licenses</h1>
      <p className="text-muted-foreground mb-8">
        Manage licenses issued to you by the government.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {licenseServices.map((service, idx) => (
          <Card key={idx} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center gap-4">
              {service.icon}
              <CardTitle>{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
              <Button onClick={() => router.push(`/dashboard/licenses/${service.slug}`)}>
                Access
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
