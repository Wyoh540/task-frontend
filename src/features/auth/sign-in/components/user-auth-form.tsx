import type { UserPubic } from "@/client/types.gen"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "@tanstack/react-router"
import { Loader2, LogIn } from "lucide-react"
import { toast } from "sonner"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getUserMeOptions } from "@/client/@tanstack/react-query.gen"
import { loginAccessTokenMutation } from "@/client/@tanstack/react-query.gen"
import { useAuthStore } from "@/stores/auth-store"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/password-input"

const formSchema = z.object({
  username: z.string().min(2, "Please enter your username").max(100),
  password: z
    .string()
    .min(1, "Please enter your password")
    .min(7, "Password must be at least 7 characters long"),
})

interface UserAuthFormProps extends React.HTMLAttributes<HTMLFormElement> {
  redirectTo?: string
}

export function UserAuthForm({
  className,
  redirectTo,
  ...props
}: UserAuthFormProps) {
  const navigate = useNavigate()
  const { auth } = useAuthStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  // prepare react-query user query (disabled until login finishes)
  const userQuery = useQuery({
    ...(getUserMeOptions({}) as any),
    enabled: false,
  })

  const loginMutation = useMutation({
    ...loginAccessTokenMutation(),
    onSuccess: async (tokenData: any) => {
      // store access token
      if (tokenData?.access_token) {
        auth.setAccessToken(tokenData.access_token)
        localStorage.setItem("access_token", tokenData.access_token)
      }

      // fetch current user via react-query
      try {
        const result = await userQuery.refetch()
        const me = result?.data as UserPubic | undefined
        if (me)
          auth.setUser({
            id: me.id,
            username: me.username,
            email: me.email ?? undefined,
            phone: me.phone ?? undefined,
            isActive: Boolean(me.is_active ?? true),
            isSuperuser: Boolean(me.is_superuser ?? false),
          })
      } catch (e) {
        // ignore user fetch errors here; user may not exist
      }

      const targetPath = redirectTo || "/"
      navigate({ to: targetPath, replace: true })
      toast.success(`Welcome back, ${form.getValues().username}!`)
    },
    onError: (err: any) => {
      const message =
        err?.response?.data?.detail || err?.message || "Sign in failed"
      toast.error(String(message))
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    // call mutation (react-query)
    await loginMutation.mutateAsync({
      body: {
        username: data.username,
        password: data.password,
        grant_type: "password",
      },
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid gap-3", className)}
        {...props}
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>用户名</FormLabel>
              <FormControl>
                <Input placeholder="请输入用户名" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>密码</FormLabel>
              <FormControl>
                <PasswordInput placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
              <Link
                to={"/forgot-password" as any}
                className="text-muted-foreground absolute end-0 -top-0.5 text-sm font-medium hover:opacity-75"
              >
                忘记密码？
              </Link>
            </FormItem>
          )}
        />
        <Button className="mt-2" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            <LogIn />
          )}
          登录
        </Button>
      </form>
    </Form>
  )
}
