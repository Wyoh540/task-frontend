import React, { useState } from "react"
import useDialogState from "@/hooks/use-dialog-state"
import type { JobOut } from "@/client"

type JobsDialogType = "create" | "update" | "delete" | "import"

interface JobsContextType {
  open: JobsDialogType | null
  setOpen: (str: JobsDialogType | null) => void
  currentRow: JobOut | null
  setCurrentRow: React.Dispatch<React.SetStateAction<JobOut | null>>
}

const JobsContext = React.createContext<JobsContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function JobsProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<JobsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<JobOut | null>(null)
  return (
    <JobsContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </JobsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useJobs = () => {
  const jobsContext = React.useContext(JobsContext)

  if (!jobsContext) {
    throw new Error("useJobs has to be used within <JobsContext>")
  }

  return jobsContext
}
