import * as React from "react"

import { VersionSwitcher } from "@/components/version-switcher"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavUser } from "@/components/nav-user"
import useAuth from "@/hooks/use-auth"
import { NavMain, type itemsType } from "@/components/nav-main"
import { BadgeAlert, UsersRound, Gauge, House, Rocket } from "lucide-react"
import { TeamSwitcher } from "./team-switcher"
import type { TeamPubilc } from "@/client"

interface sidebarDataType {
  versions: string[]
  navMain: itemsType[]
  user: {
    name: string
    email: string
    avatar: string
  }
}

// This is sample data.
export const data: sidebarDataType = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "首页",
      icon: House,
      url: "home",
    },
    {
      title: "任务列表",
      icon: Gauge,
      url: "jobs",
    },
    {
      title: "Getting Started",
      url: "#",
      icon: Rocket,
      isActive: true,
      children: [
        {
          title: "关于",
          icon: BadgeAlert,
          url: "about",
        },
      ],
    },
  ],
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
}

export function AppSidebar({
  teams,
  defaultTeamId,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  teams: TeamPubilc[]
  defaultTeamId: string
}) {
  const { user: currentUser } = useAuth()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        /> */}
        <TeamSwitcher
          teams={teams}
          defaultTeamId={defaultTeamId}
        ></TeamSwitcher>
        {/* <SearchForm /> */}
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        <NavMain items={data.navMain} />
      </SidebarContent>
      {currentUser && (
        <SidebarFooter>
          <NavUser user={currentUser} />
        </SidebarFooter>
      )}
      <SidebarRail />
    </Sidebar>
  )
}
