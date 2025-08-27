import type { ColumnDef } from "@tanstack/react-table"
import type { JobOut } from "@/client/types.gen"
import { DataTableRowActions } from "./data-table-row-actions"
import { Button } from "@/components/ui/button"

import { useNavigate } from "@tanstack/react-router"

// JobOut 类型的 ColumnDef 示例
export const columns: ColumnDef<JobOut, any>[] = [
  // 示例列，可根据实际字段调整
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "名称",
    cell: ({ row }) => {
      const navigate = useNavigate()
      const jobId = row.original.id
      const name = row.original.name
      return (
        <Button
          variant="link"
          onClick={() => navigate({ to: `${jobId}/record` })}
        >
          {name}
        </Button>
      )
    },
  },
  {
    accessorKey: "description",
    header: "描述",
  },
  {
    accessorKey: "language.language",
    header: "语言",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "owner.full_name",
    header: "所有者",
    cell: (info) => info.getValue(),
  },
  {
    id: "actions",
    header: "操作",
    cell: ({ row }) => {
      return <DataTableRowActions row={row} />
    },
  },
]
