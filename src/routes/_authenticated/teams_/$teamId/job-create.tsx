import { ConfigDrawer } from "@/components/config-drawer"
import { Header } from "@/components/layout/header"
import { Main } from "@/components/layout/main"
import { ProfileDropdown } from "@/components/profile-dropdown"
import { ThemeSwitch } from "@/components/theme-switch"
import { createFileRoute } from "@tanstack/react-router"
import { JobsMutateForm } from "@/features/jobs/components/jobs-mutate-form"

export const Route = createFileRoute(
  "/_authenticated/teams_/$teamId/job-create",
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Header fixed>
        <h2 className="text-2xl font-bold tracking-tight">新建任务</h2>
        <div className="ms-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>
      <Main>
        <JobsMutateForm />
      </Main>
    </div>
  )
}
