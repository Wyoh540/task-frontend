import type { ColumnDef } from "@tanstack/react-table"
import type { JobOut } from "@/client/types.gen"

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
    accessorKey: "owner.username",
    header: "所有者",
    cell: (info) => info.getValue(),
  },
]
