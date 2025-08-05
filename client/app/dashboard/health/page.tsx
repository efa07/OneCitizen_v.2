"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Stethoscope, Syringe, Hospital } from "lucide-react"

const healthServices = [
  {
    title: "Health Card",
    description: "View and download your digital health insurance card.",
    icon: <Stethoscope className="w-6 h-6 text-primary" />,
    slug: "health-card",
  },
  {
    title: "Vaccination Records",
    description: "Check your immunization status and vaccine history.",
    icon: <Syringe className="w-6 h-6 text-primary" />,
    slug: "vaccination-records",
  },
  {
    title: "Nearby Clinics",
    description: "Locate public health centers around your area.",
    icon: <Hospital className="w-6 h-6 text-primary" />,
    slug: "nearby-clinics",
  },
]

export default function HealthPage() {
  const router = useRouter()

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-primary">Health Services</h1>
      <p className="text-muted-foreground mb-8">
        Access your digital health data and find public clinics near you.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {healthServices.map((service, idx) => (
          <Card
            key={idx}
            onClick={() => router.push(`/health/${service.slug}`)}
            className="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          >
            <CardHeader className="flex flex-row items-center gap-4">
              {service.icon}
              <CardTitle>{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </CardContent>
            <CardContent>
               <Button onClick={() => router.push(`/dashboard/health/${service.slug}`)}>
                              Access
                    </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
