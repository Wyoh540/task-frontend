import { useParams } from "@tanstack/react-router"

import { DataTable } from "./components/data-table"
import { columns } from "./components/columns"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getTasksOptions } from "@/client/@tanstack/react-query.gen"
import { useState } from "react"

export default function Jobs() {
  const { teamId } = useParams({ strict: false })
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)

  const { data, isPending } = useQuery({
    ...getTasksOptions({
      path: { team_id: Number(teamId) },
      query: { page: page, size: size },
    }),
    placeholderData: keepPreviousData,
  })

  return (
    <div className="flex flex-col gap-2">
      <DataTable
        columns={columns}
        data={data?.items || []}
        isPending={isPending}
      />
    </div>
  )
}
