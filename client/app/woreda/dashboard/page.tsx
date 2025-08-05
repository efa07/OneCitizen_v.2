"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, FileText, Bell, FileUp } from "lucide-react"
import { toast } from "sonner"

type DashboardData = {
  message: string
  data: {
    notifications: string[]
    pendingRequests: any[]
  }
}

export default function WoredaDashboardPage() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<DashboardData | null>(null)
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null)


  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("woredaToken")
      if (!token) {
        toast.error("Unauthorized. Please login.")
        console.log("login first!")
        return
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/woreda/dashboard`, {
          headers: {
            
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) {
          throw new Error("Failed to fetch dashboard data")
        }

        const json = await res.json()
        setData(json)
      } catch (error: any) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    )
  }

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Welcome card */}
      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>👋 {data?.message}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Manage service requests, upload documents, and notify citizens.</p>
        </CardContent>
      </Card>

      {/* Pending Requests */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-muted-foreground" />
            Pending Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data?.data.pendingRequests.length ? (
            <ul className="space-y-2">
              {data.data.pendingRequests.map((req, i) => (
              <li
                key={i}
                onClick={() => setSelectedRequest(req)}
                className="text-sm text-muted-foreground cursor-pointer hover:text-primary"
              >
               📄 Request #{req.id} from {req.fullName}
              </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No pending requests.</p>
          )}
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-muted-foreground" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data?.data.notifications.length ? (
            <ul className="space-y-2">
              {data.data.notifications.map((note, i) => (
                <li key={i} className="text-sm text-muted-foreground">
                  🔔 {note}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">All caught up!</p>
          )}
        </CardContent>
      </Card>

      {/* Upload area (placeholder for future) */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileUp className="w-5 h-5 text-muted-foreground" />
            Upload Finished Files
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Upload zone will go here.</p>
        </CardContent>
      </Card>

      {selectedRequest && (
  <Card className="md:col-span-3">
    <CardHeader>
      <CardTitle>🛠️ Process Request #{selectedRequest.id}</CardTitle>
    </CardHeader>
    <CardContent>
      <form
        onSubmit={async (e) => {
          e.preventDefault()

          const formData = new FormData(e.currentTarget)
          console.log(formData)
          const token = localStorage.getItem("woredaToken")

          try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/woreda/process-request`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formData,
            })

            if (!res.ok) throw new Error("Failed to process request")

            toast.success("✅ Request processed and file sent!")
            setSelectedRequest(null) // reset the form
            setLoading(true) // trigger refresh
          } catch (err: any) {
            toast.error(err.message)
          }
        }}
        className="space-y-4"
      >
        <input type="hidden" name="requestId" value={selectedRequest.id} />
        
        <div>
          <label className="block text-sm font-medium mb-1">Response Note</label>
          <textarea
            name="responseNote"
            required
            rows={3}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Upload Result File</label>
          <input
            type="file"
            name="resultFile"
            required
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-muted file:text-sm file:font-semibold"
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
        >
          ✅ Submit Result
        </button>
      </form>
    </CardContent>
  </Card>
)}

    </div>
  )
}
