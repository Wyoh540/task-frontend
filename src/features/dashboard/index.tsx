import { getTeamOptions } from "@/client/@tanstack/react-query.gen"
import { ConfigDrawer } from "@/components/config-drawer"
import { Header } from "@/components/layout/header"
import { Main } from "@/components/layout/main"
import { ProfileDropdown } from "@/components/profile-dropdown"
import { ThemeSwitch } from "@/components/theme-switch"
import { Card } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "@tanstack/react-router"

export function Dashboard() {
  const { teamId } = useParams({ strict: false })

  // 假设团队人数为假数据，job数量通过API获取
  const teamMemberCount = 12

  const { data: teamData, isPending: teamPending } = useQuery(
    getTeamOptions({ path: { team_id: Number(teamId) } }),
  )
  const teamJobCount = teamData?.job_count || 0

  return (
    <div>
      <Header fixed>
        <div className="ms-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>
      <Main>
        <div className="flex flex-row gap-2">
          <Card className="flex w-72 flex-col items-start p-6">
            <div className="text-lg font-medium">团队人数</div>
            <div className="mt-2 text-4xl font-bold">{teamMemberCount}</div>
          </Card>
          <Card className="flex w-72 flex-col items-start p-6">
            <div className="text-lg font-medium">团队 Job 数量</div>
            <div className="mt-2 text-4xl font-bold">
              {teamPending ? "加载中..." : teamJobCount}
            </div>
          </Card>
        </div>
      </Main>
    </div>
  )
}
