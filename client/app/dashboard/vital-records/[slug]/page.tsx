"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Heart,
  UserPlus,
  Cross,
  BadgeCheck,
  BookUser,
} from "lucide-react"

const serviceData: Record<
  string,
  {
    title: string
    description: string
    icon: React.ReactNode
    fields: { label: string; name: string; type: string }[]
  }
> = {
  "birth-certificate": {
    title: "Birth Certificate",
    description: "Fill out the form to request your birth certificate.",
    icon: <UserPlus className="w-6 h-6 text-primary" />,
    fields: [
      { label: "Full Name", name: "fullName", type: "text" },
      { label: "Date of Birth", name: "dob", type: "date" },
      { label: "Place of Birth", name: "birthPlace", type: "text" },
    ],
  },
  "death-certificate": {
    title: "Death Certificate",
    description: "Request documentation for a deceased person.",
    icon: <Cross className="w-6 h-6 text-primary" />,
    fields: [
      { label: "Full Name of Deceased", name: "fullName", type: "text" },
      { label: "Date of Death", name: "dod", type: "date" },
      { label: "Place of Death", name: "deathPlace", type: "text" },
    ],
  },
  "marriage-certificate": {
    title: "Marriage Certificate",
    description: "Apply for a marriage certificate.",
    icon: <Heart className="w-6 h-6 text-primary" />,
    fields: [
      { label: "Spouse 1 Name", name: "spouse1", type: "text" },
      { label: "Spouse 2 Name", name: "spouse2", type: "text" },
      { label: "Marriage Date", name: "marriageDate", type: "date" },
    ],
  },
}

export default function ServiceFormPage() {
  const { slug } = useParams()
  const service = serviceData[slug as string]

  if (!service) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold text-destructive">404 - Service Not Found</h2>
        <p className="text-muted-foreground">Check the service slug in the URL.</p>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        {service.icon}
        <h1 className="text-2xl font-bold text-primary">{service.title}</h1>
      </div>
      <p className="text-muted-foreground mb-6">{service.description}</p>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          alert("Form submitted! (You can connect backend logic here)")
        }}
        className="space-y-4"
      >
        {service.fields.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label htmlFor={field.name} className="mb-1 font-medium">
              {field.label}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              className="border border-gray-300 p-2 rounded-md"
              required
            />
          </div>
        ))}

        <Button type="submit">Submit</Button>
      </form>
    </div>
  )
}
