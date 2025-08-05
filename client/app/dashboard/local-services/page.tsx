"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Landmark,
  Home,
  Building2,
  BadgeCheck,
  FileText,
} from "lucide-react"

const services = [
  {
    title: "Residency Letter",
    slug: "residency-letter",
    description: "Request a letter confirming your current place of residence.",
    icon: <Landmark className="w-6 h-6 text-primary" />,
  },
  {
    title: "House Registration",
    slug: "house-registration",
    description: "Register your house officially under your ownership.",
    icon: <Home className="w-6 h-6 text-primary" />,
  },
  {
    title: "Business Permit",
    slug: "business-permit",
    description: "Apply for a small business or street vendor operating permit.",
    icon: <Building2 className="w-6 h-6 text-primary" />,
  },
  {
    title: "ID Verification",
    slug: "id-verification",
    description: "Verify your Fayda or National ID at the local office.",
    icon: <BadgeCheck className="w-6 h-6 text-primary" />,
  },
  {
    title: "Document Attestation",
    slug: "document-attestation",
    description: "Get official stamps and legal endorsements for documents.",
    icon: <FileText className="w-6 h-6 text-primary" />,
  },
]

export default function LocalServicesPage() {
  const router = useRouter()

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-primary">
        Local Woreda/Kebele Services
      </h1>
      <p className="text-muted-foreground mb-8">
        Access essential services directly from your local administration.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, idx) => (
          <Card
            key={idx}
            className="hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader className="flex flex-row items-center gap-4">
              {service.icon}
              <CardTitle>{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {service.description}
              </p>
              <Button onClick={() => router.push(`/dashboard/local-services/${service.slug}`)}>
                Request
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
