import { z } from "zod"
import { useEffect } from "react"
import type { JobOut, Language } from "@/client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {
  createTaskMutation,
  getTasksQueryKey,
  listLanguagesOptions,
} from "@/client/@tanstack/react-query.gen"
import { useParams } from "@tanstack/react-router"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: JobOut
}

// 表单验证
const formSchema = z.object({
  name: z.string().min(1, "名称必填"),
  description: z.string().optional(),
  script_content: z.string().optional(),
  script_path: z.string().optional(),
  language_id: z.number(),
})

export function JobsMutateDialog({ open, onOpenChange, currentRow }: Props) {
  const isUpdate = !!currentRow
  const { teamId } = useParams({ strict: false })
  const queryclient = useQueryClient()

  // 获取语言列表
  const { data: langData } = useQuery(listLanguagesOptions())
  const languages: Language[] = langData || []

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: currentRow?.name || "",
      description: currentRow?.description || "",
      script_content: currentRow?.script_content || "",
      script_path: currentRow?.script_path || "",
      language_id: currentRow?.language?.id || 0,
    },
  })

  // 重置表单数据
  useEffect(() => {
    form.reset({
      name: currentRow?.name || "",
      description: currentRow?.description || "",
      script_content: currentRow?.script_content || "",
      script_path: currentRow?.script_path || "",
      language_id: currentRow?.language?.id || 0,
    })
  }, [currentRow, form, open])

  // 新增/编辑提交
  const createJobMutation = useMutation({
    ...createTaskMutation(),
    onSuccess: () => {
      form.reset()
    },
    onError: (err) => {
      console.log(err)
    },
    onSettled: () => {
      queryclient.invalidateQueries({
        queryKey: getTasksQueryKey({ path: { team_id: Number(teamId) } }),
      })
    },
  })
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // 编辑模式下可在此处调用自定义updateJob接口
    createJobMutation.mutateAsync({
      body: values,
      path: { team_id: Number(teamId) },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>{isUpdate ? "编辑任务" : "新建任务"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>名称</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="请输入名称" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>描述</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="请输入描述" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="script_content"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>脚本内容</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="请输入脚本内容"
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="script_path"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>脚本路径</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="请输入脚本路径" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="language_id"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>语言</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value?.toString()}
                      onValueChange={(value) => field.onChange(Number(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="请选择语言" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem
                            key={lang.id}
                            value={lang.id?.toString() || ""}
                          >
                            {lang.language}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={createJobMutation.isPending}>
                {isUpdate ? "保存修改" : "新建"}
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  取消
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
