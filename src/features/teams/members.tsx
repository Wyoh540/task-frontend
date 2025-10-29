import { useParams } from "@tanstack/react-router"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { listTeamMembersOptions } from "@/client/@tanstack/react-query.gen"
import { Main } from "@/components/layout/main"
import { Header } from "@/components/layout/header"
import { ThemeSwitch } from "@/components/theme-switch"
import { ConfigDrawer } from "@/components/config-drawer"
import { ProfileDropdown } from "@/components/profile-dropdown"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function Members() {
  const { teamId } = useParams({ strict: false })
  const paginationState = { pageIndex: 0, pageSize: 50 }

  const { data, isPending } = useQuery({
    ...listTeamMembersOptions({
      path: { team_id: Number(teamId) },
      query: {
        page: paginationState.pageIndex + 1,
        size: paginationState.pageSize,
      },
    }),
    placeholderData: keepPreviousData,
  })

  return (
    <>
      <Header fixed>
        <div className="ms-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className="mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">成员</h2>
            <p className="text-muted-foreground">团队成员列表</p>
          </div>
        </div>

        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
          {isPending ? (
            <div>Loading...</div>
          ) : (
            <div className="w-full">
              <div className="bg-card rounded-md border">
                <Table>
                  <TableHeader>
                    <tr>
                      <TableHead className="w-[40%]">成员</TableHead>
                      <TableHead className="w-[40%]">邮箱</TableHead>
                      <TableHead className="w-[20%]">角色</TableHead>
                    </tr>
                  </TableHeader>
                  <TableBody>
                    {data?.items.map((m) => (
                      <TableRow key={m.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              {/* @ts-ignore - avatar image optional */}
                              <AvatarFallback>
                                {m.user?.username?.[0] ?? "U"}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <div className="font-medium">
                                {m.user?.username || `#${m.user?.id}`}
                              </div>
                              <div className="text-muted-foreground text-sm">
                                ID: {m.user?.id}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{m.user?.email || "-"}</TableCell>
                        <TableCell>
                          <Badge variant={m.is_admin ? "default" : "outline"}>
                            {m.is_admin ? "管理员" : "成员"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                    {data?.items.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center">
                          暂无成员
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>
      </Main>
    </>
  )
}
