"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollText, School, GraduationCap } from "lucide-react"

const educationServices = [
  {
    title: "Academic Certificates",
    description: "View and download your official certificates.",
    icon: <GraduationCap className="w-6 h-6 text-primary" />,
    slug: "academic-certificates",
  },
  {
    title: "Enrollment History",
    description: "Check where and when you've been enrolled.",
    icon: <School className="w-6 h-6 text-primary" />,
    slug: "enrollment-history",
  },
  {
    title: "Verification Request",
    description: "Share records securely with employers or institutions.",
    icon: <ScrollText className="w-6 h-6 text-primary" />,
    slug: "verification-request",
  },
]

export default function EducationPage() {
  const router = useRouter()

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-primary">Education Records</h1>
      <p className="text-muted-foreground mb-8">
        Access your certificates, track your enrollment history, and request verification.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {educationServices.map((service, idx) => (
          <Card key={idx} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center gap-4">
              {service.icon}
              <CardTitle>{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
              <Button onClick={() => router.push(`/dashboard/education/${service.slug}`)}>
                Access
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
