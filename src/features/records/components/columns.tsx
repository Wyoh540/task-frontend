import type { TaskResultList } from "@/client"
import type { ColumnDef } from "@tanstack/react-table"
import { RecordResultSheet } from "./records-result-sheet"
import { Button } from "@/components/ui/button"
import { ConfirmDialog } from "@/components/confirm-dialog"
import { useParams } from "@tanstack/react-router"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { deleteTaskResultMutation } from "@/client/@tanstack/react-query.gen"
import { useState } from "react"

// hooks 方式注入 params/queryClient，避免 hooks 在 render 之外调用
export function useRecordColumns() {
  const { teamId, jobId } = useParams({ strict: false })
  const [confirmOpenId, setConfirmOpenId] = useState<string | null>(null)
  const queryClient = useQueryClient()
  const deleteMutation = useMutation({
    ...deleteTaskResultMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })

  const columns: ColumnDef<TaskResultList, any>[] = [
    {
      accessorKey: "task_id",
      header: "执行id",
    },
    {
      accessorKey: "status",
      header: "状态",
    },
    {
      accessorKey: "create_at",
      header: "创建时间",
    },
    {
      accessorKey: "date_done",
      header: "完成时间",
    },
    {
      id: "action",
      header: "操作",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <RecordResultSheet task_id={row.original.task_id} />
          <ConfirmDialog
            open={confirmOpenId === row.original.task_id}
            onOpenChange={(open) =>
              setConfirmOpenId(open ? row.original.task_id : null)
            }
            title="确认删除？"
            desc="此操作不可撤销，确定要删除该记录吗？"
            destructive
            isLoading={
              deleteMutation.status === "pending" &&
              deleteMutation.variables?.path.task_id === row.original.task_id
            }
            handleConfirm={() => {
              deleteMutation.mutate({
                path: {
                  team_id: Number(teamId),
                  job_id: Number(jobId),
                  task_id: row.original.task_id,
                },
              })
            }}
            confirmText="删除"
            cancelBtnText="取消"
          >
            <Button
              variant="destructive"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                setConfirmOpenId(row.original.task_id)
              }}
            >
              删除
            </Button>
          </ConfirmDialog>
        </div>
      ),
    },
  ]
  return columns
}
