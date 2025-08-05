"use client"

import * as React from "react"
import {
  Fingerprint,
  BookOpenCheck,
  ClipboardList,
  GraduationCap,
  HeartPulse,
  Inbox,
  Map,
  ReceiptText,
  Settings2,
  SquareTerminal,
  Vote,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "User",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "oneCitizen Inc",
      logo: Map,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Citizen Services",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Local Services",
          url: "/dashboard/local-services",
        },
        {
          title: "My Fayda Info",
          url: "/dashboard/fayda",
        },
        {
          title: "Vital Records",
          url: "/dashboard/vital-records",
        },
        {
          title: "Health",
          url: "/dashboard/health",
        },
        {
          title: "Education",
          url: "/dashboard/education",
        },
        {
          title: "Licenses service",
          url: "/dashboard/licenses",
        },
        {
          title: "Apply for a Service",
          url: "/dashboard/service-request",
        },
        
      ],
    },
    {
      title: "Messages",
      url: "/dashboard/messages",
      icon: Inbox,
      items: [
        {title: "Inbox",
          url :"/dashboard/messages"
        },
         {title: "Send",
          url :"/dashboard/messages"
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Profile Settings",
          url: "/dashboard/settings/profile",
        },
        {
          title: "Billing Settings",
          url: "/dashboard/settings/billing",
        },
        {
          title: "Other Settings",
          url: "/dashboard/settings/other",
        },
      ],
    },
  ],
  projects: [],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}")
  const { email, name, picture: avatar } = userInfo

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ email, name, avatar }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
