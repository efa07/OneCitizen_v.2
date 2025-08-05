import React from "react"
import type { JSX } from "react"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Stethoscope, Syringe, Hospital } from "lucide-react"

const services: Record<string, { title: string; description: string; icon: JSX.Element }> = {
  "health-card": {
    title: "Health Card",
    description: "Your digital health insurance card is available for download and printing.",
    icon: <Stethoscope className="w-8 h-8 text-primary" />,
  },
  "vaccination-records": {
    title: "Vaccination Records",
    description: "This page displays your complete immunization history and upcoming shots.",
    icon: <Syringe className="w-8 h-8 text-primary" />,
  },
  "nearby-clinics": {
    title: "Nearby Clinics",
    description: "Explore a list of public clinics, hospitals, and pharmacies close to you.",
    icon: <Hospital className="w-8 h-8 text-primary" />,
  },
}

export default function HealthServiceDetail({ params }: { params: { slug: string } }) {
  const service = services[params.slug]

  if (!service) return notFound()

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          {service.icon}
          <CardTitle className="text-2xl">{service.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">{service.description}</p>
        </CardContent>
      </Card>
    </div>
  )
}
