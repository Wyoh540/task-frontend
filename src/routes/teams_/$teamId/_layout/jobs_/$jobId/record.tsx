import { createFileRoute } from "@tanstack/react-router"
import JobRecords from "@/features/records"

export const Route = createFileRoute(
  "/teams_/$teamId/_layout/jobs_/$jobId/record",
)({
  component: JobRecords,
})
