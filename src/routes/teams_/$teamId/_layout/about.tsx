import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/teams_/$teamId/_layout/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/teams_/$teamId/about"!</div>
}
