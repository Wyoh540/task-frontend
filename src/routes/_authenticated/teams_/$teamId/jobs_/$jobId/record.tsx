import { createFileRoute } from "@tanstack/react-router"
import { JobRecords } from "@/features/records"

export const Route = createFileRoute(
  "/_authenticated/teams_/$teamId/jobs_/$jobId/record",
)({
  component: JobRecords,
})
