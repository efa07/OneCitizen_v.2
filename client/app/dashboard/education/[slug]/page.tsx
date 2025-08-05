"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

export default function EducationRequestForm() {
  const { slug } = useParams()

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    institution: "",
    graduationYear: "",
    purpose: "",
  })

  const [profilePic, setProfilePic] = useState<string | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("userInfo")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setForm((prev) => ({
          ...prev,
          fullName: parsed.name || "",
          email: parsed.email || "",
        }))
        if (parsed.picture?.startsWith("data:image")) {
          setProfilePic(parsed.picture)
        }
      } catch (err) {
        console.error("Invalid userInfo in localStorage", err)
      }
    }
  }, [])

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    const res = await fetch("/api/education-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serviceType: slug, ...form }),
    })

    if (res.ok) {
      alert("Education request submitted!")
    } else {
      alert("Submission failed.")
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 capitalize">
        {slug?.toString().replace("-", " ")} Request
      </h1>

      {profilePic && (
        <div className="w-[80px] h-[80px] rounded-full overflow-hidden border shadow-sm flex justify-center mb-6">
          <Image src={profilePic} alt="Profile" width={80} height={80} className="object-cover" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" name="fullName" value={form.fullName} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" value={form.email} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="institution">Institution</Label>
          <Input id="institution" name="institution" value={form.institution} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="graduationYear">Graduation Year</Label>
          <Input id="graduationYear" name="graduationYear" value={form.graduationYear} onChange={handleChange} />
        </div>
      </div>

      <div className="mb-6">
        <Label htmlFor="purpose">Purpose</Label>
        <Textarea
          id="purpose"
          name="purpose"
          value={form.purpose}
          onChange={handleChange}
          placeholder="Why are you requesting this info?"
          className="min-h-[100px]"
        />
      </div>

      <Button onClick={handleSubmit}>Submit Request</Button>
    </div>
  )
}
