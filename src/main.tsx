import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { toast } from "sonner"

import "./styles.css"
import { Toaster } from "@/components/ui/sonner.tsx"
import reportWebVitals from "./reportWebVitals.ts"
import { routeTree } from "./routeTree.gen.ts"
import { client } from "@/client/client.gen.ts"
import { ThemeProvider } from "./context/theme-provider.tsx"
import { FontProvider } from "./context/font-provider.tsx"
import { DirectionProvider } from "./context/direction-provider.tsx"

// 请求拦截器
client.instance.interceptors.request.use((config) => {
  config.headers.set({
    Authorization: "Bearer " + localStorage.getItem("access_token") || "",
  })
  return config
})

// 响应拦截器
client.instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.status === 403) {
      toast.error("登录失效")
      localStorage.removeItem("access_token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }

  // 静态数据，用于生成面包屑
  interface StaticDataRouteOption {
    // 面包屑静态数据
    breadcrumb?: {
      title: string // 面包屑标题
      display: boolean // 是否展示
    }
  }
}

const queryClient = new QueryClient()

const rootElement = document.getElementById("app")!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <FontProvider>
            <DirectionProvider>
              <RouterProvider router={router} />
              <Toaster position="top-center" richColors />
            </DirectionProvider>
          </FontProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
