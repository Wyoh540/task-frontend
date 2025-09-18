import { listJobTasksOptions } from "@/client/@tanstack/react-query.gen"

import { Main } from "@/components/layout/main"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useParams } from "@tanstack/react-router"
import { useState } from "react"
import { useRecordColumns } from "./components/columns"
import { DataTable } from "./components/data-table"
import RecordsProvider from "./context/record-context"

export default function JobRecords() {
  const { teamId, jobId } = useParams({ strict: false })
  const columns = useRecordColumns()
  const [paginationState, setPaginationState] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data, isPending } = useQuery({
    ...listJobTasksOptions({
      path: { team_id: Number(teamId), job_id: Number(jobId) },
      query: {
        page: paginationState.pageIndex + 1,
        size: paginationState.pageSize,
      },
    }),
    placeholderData: keepPreviousData,
  })

  return (
    <RecordsProvider>
      <Main>
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
      </Main>
    </RecordsProvider>
  )
}
