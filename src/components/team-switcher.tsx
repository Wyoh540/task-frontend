import * as React from "react"
import { Check, ChevronsUpDown, GalleryVerticalEnd } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import type { TeamPubilc } from "@/client"
import { useNavigate } from "@tanstack/react-router"

export function TeamSwitcher({
  teams,
  defaultTeamId,
}: {
  teams: TeamPubilc[]
  defaultTeamId: string
}) {
  const [selectedTeamId, setSelectedTeamId] = React.useState(defaultTeamId)
  const navigate = useNavigate()
  const selectedTeam = teams.find(
    (team) => team.id?.toString() === selectedTeamId,
  )

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <GalleryVerticalEnd className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-medium">所属团队</span>
                <span className="">
                  {selectedTeam ? selectedTeam.name : ""}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width)"
            align="start"
          >
            {teams.map((team) => (
              <DropdownMenuItem
                key={team.id}
                onSelect={() => {
                  typeof team.id === "number" &&
                    setSelectedTeamId(team.id.toString())
                  navigate({ to: `/teams/${team.id}/home` })
                }}
              >
                {/* v{version}{" "} */}
                {team.name}
                {team.id?.toString() === selectedTeamId && (
                  <Check className="ml-auto" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
