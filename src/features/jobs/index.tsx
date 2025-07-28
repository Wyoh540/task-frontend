import { useParams } from "@tanstack/react-router"

import { DataTable } from "./components/data-table"
import { columns } from "./components/columns"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getTasksOptions } from "@/client/@tanstack/react-query.gen"
import { useState } from "react"

export default function Jobs() {
  const { teamId } = useParams({ strict: false })
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
    <div className="flex flex-col gap-2">
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
  )
}
