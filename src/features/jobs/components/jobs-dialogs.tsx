import { ConfirmDialog } from "@/components/confirm-dialog"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  deleteJobMutation,
  listJobsQueryKey,
} from "@/client/@tanstack/react-query.gen"
import { useJobs } from "../context/jobs-context"
import { JobsMutateDialog } from "./jobs-mutate-dialog"
import { toast } from "sonner"
import { useParams } from "@tanstack/react-router"

export function JobsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useJobs()
  const { teamId } = useParams({ strict: false })
  const queryclient = useQueryClient()

  const deleteMutation = useMutation({
    ...deleteJobMutation(),
    onSuccess: () => {
      setOpen(null)
      setTimeout(() => {
        setCurrentRow(null)
      }, 500)
      toast.success("删除成功")
    },
    onSettled: () => {
      queryclient.invalidateQueries({
        queryKey: listJobsQueryKey({ path: { team_id: Number(teamId) } }),
      })
    },
  })

  return (
    <>
      <JobsMutateDialog
        key="task-create"
        open={open === "create"}
        onOpenChange={() => setOpen("create")}
      />

      {currentRow && (
        <>
          <JobsMutateDialog
            key={`task-update-${currentRow.id}`}
            open={open === "update"}
            onOpenChange={() => {
              setOpen("update")
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
          <ConfirmDialog
            key="task-delete"
            destructive
            open={open === "delete"}
            onOpenChange={() => {
              setOpen("delete")
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            handleConfirm={() => {
              if (!currentRow) return
              deleteMutation.mutate({
                path: {
                  team_id: currentRow.team_id,
                  job_id: currentRow.id,
                },
              })
            }}
            className="max-w-md"
            title={`Delete this task: ${currentRow.id} ?`}
            desc={
              <>
                You are about to delete a task with the ID{" "}
                <strong>{currentRow.id}</strong>. <br />
                This action cannot be undone.
              </>
            }
            confirmText="Delete"
          />
        </>
      )}
    </>
  )
}
