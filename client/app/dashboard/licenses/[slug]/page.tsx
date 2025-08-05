"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Field = {
  label: string
  name: string
  type: "text" | "date" | "number" | "file" | "textarea" | "select"
  placeholder?: string
  required?: boolean
  options?: string[] // for selects
}

const formConfigs: Record<string, Field[]> = {
  "drivers-license": [
    { label: "Full Name", name: "fullName", type: "text", placeholder: "John Doe" },
    { label: "License Number", name: "licenseNumber", type: "text" },
    { label: "Issued Date", name: "issuedDate", type: "date" },
    { label: "Expiry Date", name: "expiryDate", type: "date" },
  ],
  "business-license": [
    { label: "Business Name", name: "businessName", type: "text" },
    { label: "License ID", name: "licenseId", type: "text" },
    { label: "Business Type", name: "businessType", type: "select", options: ["Sole Proprietor", "PLC", "Share Company"] },
    { label: "TIN Number", name: "tinNumber", type: "text" },
  ],
  "firearm-license": [
    { label: "Owner Name", name: "ownerName", type: "text" },
    { label: "License Code", name: "licenseCode", type: "text" },
    { label: "Weapon Type", name: "weaponType", type: "select", options: ["Pistol", "Rifle", "Shotgun"] },
    { label: "Registration Date", name: "registrationDate", type: "date" },
    { label: "Additional Notes", name: "notes", type: "textarea", placeholder: "Optional comments..." },
  ],
}

export default function DynamicLicenseForm() {
  const { slug } = useParams()
  const [fields, setFields] = useState<Field[] | null>(null)

  useEffect(() => {
    if (typeof slug === "string" && formConfigs[slug]) {
      setFields(formConfigs[slug])
    }
  }, [slug])

  if (!fields) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="animate-spin w-5 h-5 mr-2 text-primary" />
        <span className="text-muted-foreground">Loading form...</span>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const entries = Object.fromEntries(formData.entries())
    console.log("Form submitted:", entries)
    alert("Form submitted! (Check console)")
  }

  const renderField = (field: Field) => {
    const common = {
      id: field.name,
      name: field.name,
      placeholder: field.placeholder,
      required: field.required ?? true,
    }

    switch (field.type) {
      case "select":
        return (
          <div className="space-y-1" key={field.name}>
            <Label htmlFor={field.name}>{field.label}</Label>
            <Select name={field.name} required={field.required}>
              <SelectTrigger>
                <SelectValue placeholder={field.placeholder || "Select option"} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )

      case "textarea":
        return (
          <div className="space-y-1" key={field.name}>
            <Label htmlFor={field.name}>{field.label}</Label>
            <Textarea {...common} />
          </div>
        )

      case "file":
        return (
          <div className="space-y-1" key={field.name}>
            <Label htmlFor={field.name}>{field.label}</Label>
            <Input type="file" name={field.name} required={field.required} />
          </div>
        )

      default:
        return (
          <div className="space-y-1" key={field.name}>
            <Label htmlFor={field.name}>{field.label}</Label>
            <Input type={field.type} {...common} />
          </div>
        )
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="capitalize">{slug?.toString().replace(/-/g, " ")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {fields.map(renderField)}
            <Button type="submit">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
