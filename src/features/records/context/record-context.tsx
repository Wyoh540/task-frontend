import type { TaskResult } from "@/client"
import useDialogState from "@/hooks/use-dialog-state"
import React, { useState } from "react"

type RecordDialogType = "view"

interface RecordContextType {
  open: RecordDialogType | null
  setOpen: (str: RecordDialogType | null) => void
  currentRow: TaskResult | null
  setCurrentRow: React.Dispatch<React.SetStateAction<TaskResult | null>>
}

const RecordContext = React.createContext<RecordContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function RecordsProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<RecordDialogType>(null)
  const [currentRow, setCurrentRow] = useState<TaskResult | null>(null)
  return (
    <RecordContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </RecordContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useRecord = () => {
  const recordsContext = React.useContext(RecordContext)

  if (!recordsContext) {
    throw new Error("useJobs has to be used within <JobsContext>")
  }

  return recordsContext
}
