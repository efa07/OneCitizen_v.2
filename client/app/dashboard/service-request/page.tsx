"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  FilePlus,
  FileText,
  Building,
  HeartPulse,
  GraduationCap,
  ScrollText,
} from "lucide-react"

const serviceCategories = [
  {
    title: "Identity & Residency",
    description: "Request residency letters, ID verifications, or household registration.",
    icon: <ScrollText className="w-6 h-6 text-primary" />,
  },
  {
    title: "Vital Records",
    description: "Submit applications for birth, marriage, or death certificates.",
    icon: <FileText className="w-6 h-6 text-primary" />,
    action: () => alert("Apply for Vital Record"),
  },
  {
    title: "Health Services",
    description: "Request vaccination records, health card access, or clinic registration.",
    icon: <HeartPulse className="w-6 h-6 text-primary" />,
    action: () => alert("Apply for Health Service"),
  },
  {
    title: "Education Records",
    description: "Apply for academic certificate retrieval or verification.",
    icon: <GraduationCap className="w-6 h-6 text-primary" />,
    action: () => alert("Apply for Education Service"),
  },
  {
    title: "Business & Tax",
    description: "Request tax clearance or small business permits.",
    icon: <Building className="w-6 h-6 text-primary" />,
    action: () => alert("Apply for Business or Tax Service"),
  },
  {
    title: "General Request",
    description: "Submit any other custom service request.",
    icon: <FilePlus className="w-6 h-6 text-primary" />,
    action: () => alert("Submit General Request"),
  },
]

export default function ServiceRequestPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-primary">Apply for a Service</h1>
      <p className="text-muted-foreground mb-8">
        Submit official applications for various government and public services.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviceCategories.map((service, idx) => (
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
              <Button onClick={service.action}>Start Application</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
