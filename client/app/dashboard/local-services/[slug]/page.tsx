"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { toast } from "sonner"

const serviceFields: Record<string, { label: string; name: string }[]> = {
  "business-permit": [
    { label: "Business Name", name: "businessName" },
    { label: "Business Type", name: "businessType" },
    { label: "TIN Number", name: "tinNumber" },
  ],
  "house-registration": [
    { label: "House Number", name: "houseNumber" },
    { label: "Property Size (m²)", name: "propertySize" },
  ],
  "id-verification": [
    { label: "ID Type", name: "idType" },
    { label: "Issuing Authority", name: "issuingAuthority" },
  ],
}

export default function ServiceRequestPage() {
  const { slug } = useParams()
  const [form, setForm] = useState<any>({
    fullName: "",
    address: "",
    email: "",
    phoneNumber: "",
    faydaId: "",
    nationality: "",
    gender: "",
    region: "",
    zone: "",
    reason: "",
  })

  const [profilePic, setProfilePic] = useState<string | null>(null)
  const [responseText, setResponseText] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  //  1stfill  form from localStorage + add dynamic fields
  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo")
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser)
        setForm((prev: any) => ({
          ...prev,
          fullName: parsed.name || "",
          email: parsed.email || "",
          phoneNumber: parsed.phoneNumber || "",
          faydaId: parsed.faydaId || "",
          nationality: parsed.nationality || "",
          gender: parsed.gender || "",
          region: parsed.region || "",
          zone: parsed.zone || "",
        }))
        if (parsed.picture?.startsWith("data:image")) {
          setProfilePic(parsed.picture)
        }
      } catch (err) {
        console.error("Invalid userInfo in localStorage", err)
      }
    }

    const extras = serviceFields[slug as string] || []
    const defaults = extras.reduce((acc, field) => {
      acc[field.name] = ""
      return acc
    }, {} as any)

    setForm((prev: any) => ({ ...prev, ...defaults }))
  }, [slug])

  //  Fetch Woreda response if it exists
  useEffect(() => {
    const fetchResponse = async () => {
      if (!form.faydaId || !slug) return
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/request?serviceType=${slug}&userId=${form.faydaId}`
        )
        const data = await res.json()
        if (data?.response) setResponseText(data.response)
      } catch (err) {
        console.error("Fetch response failed", err)
      }
    }

    fetchResponse()
  }, [slug, form.faydaId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceType: slug, ...form }),
      })

      if (res.ok) {
        toast("Request submitted!")
        const data = await res.json()
        if (data?.response) setResponseText(data.response)
      } else {
        toast.error(" Failed to submit.")
      }
    } catch (err) {
      console.error("Submit error:", err)
      toast.error("Something went wrong.")
    } finally {
      setSubmitting(false)
      setForm({
        reason: "",
        ...(serviceFields[slug as string]?.reduce((acc, field) => {
          acc[field.name] = ""
          return acc
        }, {} as any) || {})
      })
    }
  }

  const renderInput = (label: string, name: keyof typeof form) => (
    <div className="space-y-1">
      <Label htmlFor={String(name)}>{label}</Label>
      <Input id={String(name)} name={String(name)} value={form[name]} onChange={handleChange} />
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 capitalize">
        {slug?.toString().replace("-", " ")} Request
      </h1>

      {profilePic && (
        <div className="w-[80px] h-[80px] rounded-full overflow-hidden border shadow-sm flex justify-center mb-6">
          <Image
            src={profilePic}
            alt="Profile"
            width={80}
            height={80}
            className="object-cover"
          />
        </div>
      )}

      {/*  Personal Info */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-primary mb-2">Personal Info</h2>
        <Separator className="mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderInput("Full Name", "fullName")}
          {renderInput("Gender", "gender")}
          {renderInput("Nationality", "nationality")}
          {renderInput("Fayda ID", "faydaId")}
        </div>
      </div>

      {/* Contact Info */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-primary mb-2">Contact Info</h2>
        <Separator className="mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderInput("Email", "email")}
          {renderInput("Phone Number", "phoneNumber")}
        </div>
      </div>

      {/* ocation Info */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-primary mb-2">Location Info</h2>
        <Separator className="mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderInput("Region", "region")}
          {renderInput("Zone", "zone")}
          {renderInput("Address", "address")}
        </div>
      </div>

      {/*Reason */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-primary mb-2">Request Info</h2>
        <Separator className="mb-4" />
        <div className="space-y-1">
          <Label htmlFor="reason">Reason for Request</Label>
          <Textarea
            id="reason"
            name="reason"
            value={form.reason}
            onChange={handleChange}
            placeholder="Explain your request in detail..."
            className="min-h-[100px]"
          />
        </div>
      </div>

      {/* Dynamic Extra Fields */}
      {(serviceFields[slug as string] || []).length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-primary mb-2">Extra Info</h2>
          <Separator className="mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {serviceFields[slug as string].map((field) => (
              <div key={field.name} className="space-y-1">
                <Label htmlFor={field.name}>{field.label}</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={form[field.name] || ""}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8">
        <Button onClick={handleSubmit} disabled={submitting} className="w-full md:w-auto">
          {submitting ? "Submitting..." : "Submit Request"}
        </Button>
      </div>

      {/* Woreda Response */}
      {responseText && (
        <div className="mt-10 p-4 bg-green-100 border border-green-300 rounded-md shadow-sm">
          <h2 className="font-bold text-green-800 mb-2">Woreda Response:</h2>
          <p className="text-green-900 whitespace-pre-wrap">{responseText}</p>
        </div>
      )}
    </div>
  )
}
