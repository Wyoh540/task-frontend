import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Link } from "@tanstack/react-router"

export interface itemsType {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  children?: itemsType[]
}

export function NavMain({ items }: { items: itemsType[] | itemsType }) {
  const itemsArrary = Array.isArray(items) ? items : [items]
  return (
    <SidebarGroup>
      <SidebarMenu>
        {itemsArrary.map((item) =>
          item.children ? (
            <Collapsible
              key={item.title}
              defaultOpen={item.isActive}
              asChild
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                {item.children?.length ? (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.children.map((subItem, index) => (
                        <NavMain key={index} items={subItem} />
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                ) : null}
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title}>
              <Link to={item.url}>
                {({ isActive }) => {
                  console.log(item.url)
                  return (
                    <SidebarMenuButton isActive={isActive}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  )
                }}
              </Link>
            </SidebarMenuItem>
          ),
        )}
      </SidebarMenu>
    </SidebarGroup>
  )
}
