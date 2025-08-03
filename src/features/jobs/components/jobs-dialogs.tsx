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

      {currentRow && (
        <>
          <JobsMutateDialog
            key="task-update"
            open={open === "update"}
            onOpenChange={() => {
              setOpen("update")
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
