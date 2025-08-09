import type { TaskResultList } from "@/client"
import type { ColumnDef } from "@tanstack/react-table"
import { RecordResultSheet } from "./records-result-sheet"

export const columns: ColumnDef<TaskResultList, any>[] = [
  {
    accessorKey: "task_id",
    header: "执行id",
  },
  {
    accessorKey: "status",
    header: "状态",
  },
  {
    accessorKey: "date_done",
    header: "完成时间",
  },
  {
    id: "action",
    header: "操作",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <RecordResultSheet task_id={row.original.task_id} />
        </div>
      )
    },
  },
]
