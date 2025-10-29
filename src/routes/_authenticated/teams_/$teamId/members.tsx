import { createFileRoute } from "@tanstack/react-router"
import { Members } from "@/features/teams/members"

export const Route = createFileRoute("/_authenticated/teams_/$teamId/members")({
  component: Members,
})
