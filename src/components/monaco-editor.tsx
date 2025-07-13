import Editor, { type Monaco } from "@monaco-editor/react"
import * as monaco from "monaco-editor"
import { loader } from "@monaco-editor/react"
import { useEffect, useRef } from "react"

loader.config({ monaco })

interface MonacoEditorProps {
  value?: string
  language?: string
  theme?: string
  onChange?: (value: string) => void
  onMount?: (
    editor: monaco.editor.IStandaloneCodeEditor,
    monaco: Monaco,
  ) => void
}

export function MonacoEditor({
  onMount,
  onChange,
  value = "test",
  language = "javascript",
  theme = "vs",
}: MonacoEditorProps) {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const monacoRef = useRef<Monaco | null>(null)

  function handleEditorChange(value: string | undefined) {
    if (onChange && value) {
      onChange(value)
    }
  }

  function handleEditorDidMount(
    editor: monaco.editor.IStandaloneCodeEditor,
    monaco: Monaco,
  ) {
    // here is the editor instance
    // you can store it in `useRef` for further usage
    editorRef.current = editor
    monacoRef.current = monaco
    if (onMount) {
      onMount(editor, monaco)
    }
  }

  // 监听 language 变化
  useEffect(() => {
    if (editorRef.current && monacoRef.current) {
      const model = editorRef.current.getModel()
      if (model) {
        monacoRef.current.editor.setModelLanguage(model, language)
      }
    }
  }, [language])

  // 监听 theme 变化
  useEffect(() => {
    if (editorRef.current && monacoRef.current) {
      monacoRef.current.editor.setTheme(theme)
    }
  }, [theme])

  return (
    <Editor
      height="85vh"
      defaultLanguage={language}
      defaultValue={value}
      theme={theme}
      onChange={handleEditorChange}
      onMount={handleEditorDidMount}
    />
  )
}
