import { getTeamOptions } from "@/client/@tanstack/react-query.gen"
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
    <div className="flex gap-6 p-3">
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
  )
}
