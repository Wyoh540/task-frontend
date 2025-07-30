import { createFileRoute, useMatches } from "@tanstack/react-router"
import { Outlet, redirect } from "@tanstack/react-router"
import { AppSidebar } from "@/components/app-sidebar"
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { isLoggedIn } from "@/hooks/use-auth"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getTeamsOptions } from "@/client/@tanstack/react-query.gen"

export const Route = createFileRoute("/teams_/$teamId/_layout")({
  component: Layout,
  beforeLoad: async () => {
    if (!isLoggedIn()) {
      throw redirect({
        to: "/login",
      })
    }
  },
})

function Layout() {
  const matches = useMatches()
  const { teamId } = Route.useParams()
  const breadcrumbs = matches
    .filter((match) => match.staticData.breadcrumb?.display === true) // 过滤需要显示的节点
    .map((match) => ({
      title: match.staticData.breadcrumb?.title,
      path: match.pathname,
    }))

  const { data } = useQuery({
    ...getTeamsOptions(),
    placeholderData: keepPreviousData,
  })
  return (
    <SidebarProvider>
      <AppSidebar teams={data?.items || []} defaultTeamId={teamId} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          {breadcrumbs.map((crumb, index) => (
            <BreadcrumbItem key={index}>
              <BreadcrumbLink href={crumb.path}>{crumb.title}</BreadcrumbLink>
              {index < breadcrumbs.length - 1 && (
                <BreadcrumbSeparator className="hidden md:block" />
              )}
            </BreadcrumbItem>
          ))}
        </header>
        <div className="flex flex-col gap-2 p-2">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
export default Layout
