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
import { Play } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { runTaskMutation } from "@/client/@tanstack/react-query.gen"
import { toast } from "sonner"

interface DataTableRowActionsProps {
  row: Row<JobOut>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const job = row.original

  const { setOpen, setCurrentRow } = useJobs()

  const runJobMutation = useMutation({
    ...runTaskMutation(),
    onSuccess: () => {
      toast.success("启动成功")
    },
  })

  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        disabled={runJobMutation.isPending}
        onClick={() => {
          runJobMutation.mutate({
            path: {
              team_id: job.team_id,
              job_id: job.id,
            },
          })
        }}
      >
        <Play />
      </Button>
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
              setCurrentRow(job)
              setOpen("update")
            }}
          >
            编辑
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
