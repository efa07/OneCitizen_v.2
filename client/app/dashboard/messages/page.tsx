"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"
const messages = [
  {
    id: 1,
    name: "Citizen",
    avatar: "C",
    text: "Hi, I’d like to request my driver's license renewal.",
    sentByUser: true,
  },
  {
    id: 2,
    name: "Woreda Office",
    avatar: "W",
    text: "Sure. Please upload your previous license and fill out the renewal form.",
    sentByUser: false,
  },
]
  const handleSubmit = (e:any) => {
    e.preventDefault
    alert("comeing soon")
  }


export default function MessageComponent() {
  const [newMessage, setNewMessage] = React.useState("")

  return (
    <div className="p-3 mx-auto">
      <div className="space-y-4 bg-muted p-4 w-full rounded-xl shadow-inner h-[500px] overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn("flex items-start gap-3", msg.sentByUser ? "justify-end" : "justify-start")}
          >
            {!msg.sentByUser && (
              <Avatar className="h-8 w-8">
                <AvatarFallback>{msg.avatar}</AvatarFallback>
              </Avatar>
            )}

            <Card
              className={cn(
                "px-4 py-2 text-sm w-full rounded-xl",
                msg.sentByUser
                  ? "bg-white text-black rounded-br-none"
                  : "bg-neutral-900 text-white rounded-bl-none"
              )}
            >
              {msg.text}
            </Card>

            {msg.sentByUser && (
              <Avatar className="h-8 w-8">
                <AvatarFallback>{msg.avatar}</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </div>

    <form
      onSubmit={handleSubmit}
      className={cn(
        "mt-4 flex items-end gap-3 border rounded-xl p-3 bg-muted/50 shadow-sm backdrop-blur",
        "focus-within:ring-2 focus-within:ring-primary transition-all"
      )}
    >
      <Textarea
        className="flex-1 resize-none border-none bg-transparent shadow-none text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
        rows={2}
        placeholder="Type your message and hit Enter..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e)
          }
        }}
      />
      <Button
        type="submit"
        className="h-10 w-10 p-0 rounded-full bg-primary text-white hover:bg-primary/90 transition"
      >
        <Send className="h-4 w-4" />
        <span className="sr-only">Send</span>
      </Button>
    </form>
    </div>
  )
}
