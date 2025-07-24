import { useState } from "react"

import { Loader2 } from "lucide-react"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm, type SubmitHandler } from "react-hook-form"

import {
  getTeamsOptions,
  createTeamMutation,
  getTeamsQueryKey,
} from "@/client/@tanstack/react-query.gen"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import type { TeamCreate } from "@/client"
import { Textarea } from "@/components/ui/textarea"
export const Route = createFileRoute("/teams")({
  component: RouteComponent,
})

function CreateTeam() {
  const [open, setOpen] = useState(false)

  const queryClient = useQueryClient()

  // 创建团队
  const createMutation = useMutation({
    ...createTeamMutation(),
    onSuccess: () => {
      form.reset()
      setOpen(false)
    },
    onSettled: () => {
      form.reset()
      setOpen(false)
      queryClient.invalidateQueries({
        queryKey: getTeamsQueryKey({ query: { page: 1, size: 10 } }),
      })
    },
  })
  const form = useForm<TeamCreate>({
    defaultValues: {
      name: "",
      description: "",
    },
  })

  const onSubmit: SubmitHandler<TeamCreate> = async (data) => {
    await createMutation.mutateAsync({ body: data })
  }
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
        form.reset()
      }}
    >
      <DialogTrigger asChild>
        <Button>新建团队</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>新建团队</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>团队名称</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field}></Input>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>团队描述</FormLabel>
                  <FormControl>
                    <Textarea placeholder="description" {...field}></Textarea>
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                variant="default"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="animate-spin" />
                )}
                保存
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

function RouteComponent() {
  const navigate = useNavigate()

  // 团队列表数据请求
  const { data, isPending } = useQuery({
    ...getTeamsOptions({ query: { page: 1, size: 10 } }),
    placeholderData: keepPreviousData,
  })

  return (
    <div className="m-8 pt-12">
      <div className="mb-4 flex items-center justify-between">
        <CreateTeam />
      </div>
      <div>
        {isPending ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {data?.items.map((team) => (
              <Card
                key={team.id}
                onClick={() => navigate({ to: `/teams/${team.id}/home` })}
              >
                <CardHeader>
                  <CardTitle>{team.name}</CardTitle>
                  <CardDescription>{team.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
