import { useLayout } from "@/context/layout-provider"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
// import { AppTitle } from './app-title'
import { sidebarData } from "./data/sidebar-data"
import { NavGroup } from "./nav-group"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getTeamsOptions } from "@/client/@tanstack/react-query.gen"

export function AppSidebar() {
  const { collapsible, variant } = useLayout()
  const { data } = useQuery({
    ...getTeamsOptions(),
    placeholderData: keepPreviousData,
  })
  // 兼容 TeamSwitcher 组件的 teams 属性，data?.items 为 TeamPubilc[]
  const teams = (data?.items ?? []).map((team) => ({
    name: team.name,
    // logo 字段需要后端或本地有对应资源，这里用占位符
    logo: () => null,
    plan: team.description,
  }))

  return (
    <Sidebar collapsible={collapsible} variant={variant}>
      <SidebarHeader>
        <TeamSwitcher teams={sidebarData.teams} />

        {/* Replace <TeamSwitch /> with the following <AppTitle />
         /* if you want to use the normal app title instead of TeamSwitch dropdown */}
        {/* <AppTitle /> */}
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
