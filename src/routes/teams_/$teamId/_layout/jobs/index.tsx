import { createFileRoute } from "@tanstack/react-router"
import Jobs from "@/features/jobs"

export const Route = createFileRoute("/teams_/$teamId/_layout/jobs/")({
  component: Jobs,
})
