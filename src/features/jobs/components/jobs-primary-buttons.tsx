import { Button } from "@/components/ui/button"
import { useJobs } from "../context/jobs-context"
import { Download, Plus } from "lucide-react"
import { useNavigate, useParams } from "@tanstack/react-router"

export function JobsPrimaryButtons() {
  const { setOpen } = useJobs()
  const navigate = useNavigate()
  const { teamId } = useParams({ strict: false })

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        className="space-x-1"
        onClick={() => setOpen("import")}
      >
        <span>Import</span> <Download size={18} />
      </Button>
      <Button
        className="space-x-1"
        onClick={() => navigate({ to: `/teams/${teamId}/job-create` })}
      >
        <span>Create</span> <Plus size={18} />
      </Button>
    </div>
  )
}
