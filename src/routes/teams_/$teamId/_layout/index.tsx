import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/teams_/$teamId/_layout/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/teams_/$teamId/_layout/"!</div>
}
