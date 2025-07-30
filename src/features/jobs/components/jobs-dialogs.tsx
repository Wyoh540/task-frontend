import { useJobs } from "../context/jobs-context"
import { JobsMutateDialog } from "./jobs-mutate-dialog"

export function JobsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useJobs()

  return (
    <>
      <JobsMutateDialog
        key="task-create"
        open={open === "create"}
        onOpenChange={() => setOpen("create")}
      />
    </>
  )
}
