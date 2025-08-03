import type { Row } from "@tanstack/react-table"
import { useJobs } from "../context/jobs-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontalIcon } from "lucide-react"
import type { JobOut } from "@/client/types.gen"

interface DataTableRowActionsProps {
  row: Row<JobOut>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const jobs = row.original

  const { setOpen, setCurrentRow } = useJobs()

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
        >
          <MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(jobs)
            setOpen("update")
          }}
        >
          编辑
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
