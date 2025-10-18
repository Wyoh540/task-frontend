import { createFileRoute } from "@tanstack/react-router"
import { JobsMutateForm } from "@/features/jobs/components/jobs-mutate-form"
import { Main } from "@/components/layout/main"
import { Header } from "@/components/layout/header"
import { ThemeSwitch } from "@/components/theme-switch"
import { ConfigDrawer } from "@/components/config-drawer"
import { ProfileDropdown } from "@/components/profile-dropdown"

export const Route = createFileRoute(
  "/_authenticated/teams_/$teamId/jobs_/$jobId/job-update",
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Header fixed>
        <h2 className="text-2xl font-bold tracking-tight">编辑任务</h2>
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
