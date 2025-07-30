import { useParams } from "@tanstack/react-router"

import { DataTable } from "./components/data-table"
import { columns } from "./components/columns"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getTasksOptions } from "@/client/@tanstack/react-query.gen"
import { useState } from "react"
import JobsProvider from "./context/jobs-context"
import { JobsPrimaryButtons } from "./components/jobs-primary-buttons"
import { JobsDialogs } from "./components/jobs-dialogs"

export default function Jobs() {
  const { teamId } = useParams({ strict: false })
  // 分页默认配置
  const [paginationState, setPaginationState] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data, isPending } = useQuery({
    ...getTasksOptions({
      path: { team_id: Number(teamId) },
      query: {
        page: paginationState.pageIndex + 1,
        size: paginationState.pageSize,
      },
    }),
    placeholderData: keepPreviousData,
  })

  return (
    <JobsProvider>
      <div className="mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
        <JobsPrimaryButtons />
      </div>
      <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
        <DataTable
          columns={columns}
          data={data?.items || []}
          pagination={paginationState}
          paginationOptions={{
            onPaginationChange: (pagination) => {
              setPaginationState(pagination)
            },
            rowCount: data?.total || 0,
          }}
          isPending={isPending}
        />
      </div>
      <JobsDialogs />
    </JobsProvider>
  )
}
