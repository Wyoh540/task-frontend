import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { MonacoEditor } from "@/components/monaco-editor"
import { useQuery } from "@tanstack/react-query"

import { getTaskResultOptions } from "@/client/@tanstack/react-query.gen"
import { useParams } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"

interface Props {
  task_id: string
}

export function RecordResultSheet({ task_id }: Props) {
  const { teamId, jobId } = useParams({ strict: false })

  const { data: recordResult } = useQuery(
    getTaskResultOptions({
      path: {
        team_id: Number(teamId),
        job_id: Number(jobId),
        task_id: task_id,
      },
    }),
  )

  return (
    <Sheet modal={false}>
      <SheetTrigger>
        <Button variant="link">详情</Button>
      </SheetTrigger>
      <SheetContent className="w-1/2 sm:max-w-3xl" aria-describedby={undefined}>
        <SheetHeader>
          <SheetTitle>任务结果</SheetTitle>
        </SheetHeader>
        <MonacoEditor
          value={recordResult?.result?.stdout || ""}
          language="python"
        />
      </SheetContent>
    </Sheet>
  )
}
