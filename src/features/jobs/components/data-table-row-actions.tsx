import type { Row } from "@tanstack/react-table"
import { useJobs } from "../context/jobs-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontalIcon, Trash2 } from "lucide-react"
import type { JobOut } from "@/client/types.gen"
import { Play } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { runTaskMutation } from "@/client/@tanstack/react-query.gen"
import { toast } from "sonner"

interface DataTableRowActionsProps {
  row: Row<JobOut>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const job = row.original
  const navigate = useNavigate()
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
            onClick={() =>
              navigate({
                to: `/teams/${job.team_id}/jobs/${job.id}/job-update`,
              })
            }
          >
            编辑
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(job)
              setOpen("delete")
            }}
          >
            Delete
            <DropdownMenuShortcut>
              <Trash2 size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
