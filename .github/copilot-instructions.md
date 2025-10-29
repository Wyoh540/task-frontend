## 概览（快速上手）

这是一个 Vite + React 应用，核心技术栈：TanStack Router（code-based，routeTree 在 `src/routeTree.gen.ts`）、@tanstack/react-query、Tailwind v4、以及通过 `@hey-api/openapi-ts` 生成的 API 客户端（输出到 `src/client`）。

以下说明面向自动化/AI 助手，目标是能马上编辑、构建和调试本仓库。

## 大局观（架构与数据流）

- 启动：`src/main.tsx` 构建 providers 链（ThemeProvider → FontProvider → DirectionProvider → RouterProvider）并创建 TanStack Router（使用 `routeTree`）。
- 数据层：后端 API 通过 openapi 生成的客户端（`src/client/*.gen.ts`），很多请求会被生成为 React Query hooks（见 `src/client` 输出与 `@tanstack/react-query` 插件）。
- 请求拦截：全局拦截器在 `src/main.tsx` 设置（示例：自动注入 `Authorization` header，403 返回触发登出并跳转 `/login`）。

- UI 组件使用 shadcn-UI：位于 `src/components`，按功能模块划分（如 `layout`、`forms`、`tables` 等）。

## 关键文件快速导航

- `src/main.tsx` — 入口、providers、拦截器、RouterProvider。修改全局行为（auth、toast、devtools）在这里。
- `vite.config.js` — 插件（Monaco、不使用 CDN）、别名 `@`、以及 TanStack Router 文件路由插件配置。
- `tsconfig.json` — 严格模式、paths (`@/*`)、moduleResolution=bundler、目标 ES2022。
- `openapi-ts.config.ts` — 生成 API client 的输入地址与插件列表（修改后需运行 `yarn generate-client`）。
- `src/client` — 生成产物（不要长久手动修改 `*.gen.ts`）。

## 常见任务与命令（PowerShell）

```powershell
yarn
yarn start       # vite dev (port 3000)
yarn build       # vite build && tsc
yarn serve       # vite preview
yarn test        # vitest
yarn generate-client  # npx @hey-api/openapi-ts (后端必须可达)
```

注意：`openapi-ts.config.ts` 默认指向 `http://localhost:8080/api/v1/openapi.json` —— 若后端不在本机，先修改配置。

## 项目约定与注意点（对 AI 自动改动尤为重要）

- 使用 `@/...` imports（由 `tsconfig`/`vite` alias 支持）。
- 遵守严格 TS：避免未使用符号、保持类型兼容（CI/本地都会运行 `tsc`）。
- 不要直接长期编辑 `src/client/*.gen.ts`；若需要改 API，请变更 `openapi-ts.config.ts` 或后端 OpenAPI，再运行 `yarn generate-client`。

## 调试与开发提示

- Devtools：`import.meta.env.MODE === "development"` 会渲染 React Query Devtools 与 TanStack Router Devtools（位于 `src/routes/__root.tsx` 的 root route 组件或 `src/main.tsx`）。
- Monaco：项目使用 `vite-plugin-monaco-editor-esm`（本地打包，不走 CDN），新增 Monaco 相关依赖需兼容该插件。
- 测试环境：`vite.config.js` 内配置了 Vitest（globals + jsdom）。

## 小样例（添加受保护请求）

在 `src/main.tsx` 中：

```ts
client.instance.interceptors.request.use((config) => {
  config.headers.set({
    Authorization: `Bearer ${localStorage.getItem("access_token") || ""}`,
  })
  return config
})
```

## 变更/提交建议

- 小变更：保持单文件变更，运行 `tsc` 保证类型通过。
- 大改（路由、openapi、插件升级）：在 PR 描述中注明影响范围，并在本地运行 `yarn build` + `yarn generate-client` 做验证。

---

如果需要，我可以将 README 中详细的路由/loader 教程摘录到这里，或根据团队 CI/环境变量补充更多约定。请告诉我想要哪些额外细节。
