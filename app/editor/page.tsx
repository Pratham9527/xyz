"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bold, Italic, Link, List, ListOrdered, ImageIcon, Code, Heading1, Heading2, Heading3, Eye, EyeOff, Save } from "lucide-react"
import MDEditor from '@uiw/react-md-editor'
import { Card } from '@/components/ui/card'

export default function MarkdownEditorPage() {
  const [markdown, setMarkdown] = useState<string>('# Hello World\n\nStart writing your markdown here...')
  const [showPreview, setShowPreview] = useState(true)
  const [wordCount, setWordCount] = useState<number>(0)
  const [charCount, setCharCount] = useState<number>(0)

  useEffect(() => {
    // Count words and characters
    const text = markdown.replace(/[#*`_~]/g, '') // Remove markdown syntax
    const words = text.trim().split(/\s+/).filter(word => word.length > 0)
    setWordCount(words.length)
    setCharCount(text.length)
  }, [markdown])

  const insertMarkdown = (prefix: string, suffix = "") => {
    const textarea = document.getElementById("markdown-editor") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = markdown.substring(start, end)
    const beforeText = markdown.substring(0, start)
    const afterText = markdown.substring(end)

    const newText = beforeText + prefix + selectedText + suffix + afterText
    setMarkdown(newText)

    // Set cursor position after the operation
    setTimeout(() => {
      textarea.focus()
      textarea.selectionStart = start + prefix.length
      textarea.selectionEnd = start + prefix.length + selectedText.length
    }, 0)
  }

  const renderMarkdown = (text: string) => {
    // This is a simple renderer for demonstration
    // In a real app, you'd use a library like marked or remark

    // Convert headers
    text = text.replace(/^### (.*$)/gm, "<h3>$1</h3>")
    text = text.replace(/^## (.*$)/gm, "<h2>$1</h2>")
    text = text.replace(/^# (.*$)/gm, "<h1>$1</h1>")

    // Convert bold and italic
    text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    text = text.replace(/\*(.*?)\*/g, "<em>$1</em>")

    // Convert links
    text = text.replace(/\[(.*?)\]$$(.*?)$$/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')

    // Convert images
    text = text.replace(/!\[(.*?)\]$$(.*?)$$/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-md my-4" />')

    // Convert blockquotes
    text = text.replace(
      /^> (.*$)/gm,
      '<blockquote class="border-l-4 border-neutral-300 pl-4 italic text-neutral-600">$1</blockquote>',
    )

    // Convert lists
    text = text.replace(/^\* (.*$)/gm, "<ul><li>$1</li></ul>")
    text = text.replace(/^\d\. (.*$)/gm, "<ol><li>$1</li></ol>")

    // Fix for adjacent list items
    text = text.replace(/<\/ul>\s*<ul>/g, "")
    text = text.replace(/<\/ol>\s*<ol>/g, "")

    // Convert tables (basic support)
    if (text.includes("|")) {
      const lines = text.split("\n")
      let inTable = false
      let tableHtml = '<table class="min-w-full border-collapse my-4"><thead>'

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]

        if (line.includes("|") && !inTable) {
          inTable = true
          const cells = line.split("|").filter((cell) => cell.trim() !== "")
          tableHtml += "<tr>"
          cells.forEach((cell) => {
            tableHtml += `<th class="border border-neutral-300 px-4 py-2">${cell.trim()}</th>`
          })
          tableHtml += "</tr></thead><tbody>"

          // Skip the separator line
          i++
        } else if (line.includes("|") && inTable) {
          const cells = line.split("|").filter((cell) => cell.trim() !== "")
          tableHtml += "<tr>"
          cells.forEach((cell) => {
            tableHtml += `<td class="border border-neutral-300 px-4 py-2">${cell.trim()}</td>`
          })
          tableHtml += "</tr>"
        } else if (!line.includes("|") && inTable) {
          inTable = false
          tableHtml += "</tbody></table>"
          text = text.replace(/\|.*\|(\n\|.*\|)+/g, tableHtml)
        }
      }

      if (inTable) {
        tableHtml += "</tbody></table>"
        text = text.replace(/\|.*\|(\n\|.*\|)+/g, tableHtml)
      }
    }

    // Convert paragraphs (must be last)
    text = text.replace(/^(?!<[a-z]|\s*$).*$/gm, "<p>$&</p>")

    // Fix for adjacent paragraphs
    text = text.replace(/<\/p>\s*<p>/g, "</p><p>")

    return text
  }

  const handleSave = () => {
    // Here you would typically save to a backend
    console.log('Saving content:', markdown)
    // You could add a toast notification here
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Markdown Editor</h1>
          <p className="text-neutral-600">
            Write your running journal, training notes, or race reports using Markdown syntax.
          </p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-lg shadow-sm overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center gap-1 p-2 border-b border-neutral-200 bg-neutral-50">
            <Button variant="ghost" size="sm" onClick={() => insertMarkdown("# ", "\n")} title="Heading 1">
              <Heading1 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => insertMarkdown("## ", "\n")} title="Heading 2">
              <Heading2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => insertMarkdown("### ", "\n")} title="Heading 3">
              <Heading3 className="h-4 w-4" />
            </Button>
            <div className="h-4 w-px bg-neutral-200 mx-1"></div>
            <Button variant="ghost" size="sm" onClick={() => insertMarkdown("**", "**")} title="Bold">
              <Bold className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => insertMarkdown("*", "*")} title="Italic">
              <Italic className="h-4 w-4" />
            </Button>
            <div className="h-4 w-px bg-neutral-200 mx-1"></div>
            <Button variant="ghost" size="sm" onClick={() => insertMarkdown("[", "](https://)")} title="Link">
              <Link className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => insertMarkdown("![Alt text](", ")")} title="Image">
              <ImageIcon className="h-4 w-4" />
            </Button>
            <div className="h-4 w-px bg-neutral-200 mx-1"></div>
            <Button variant="ghost" size="sm" onClick={() => insertMarkdown("* ", "\n")} title="Unordered List">
              <List className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => insertMarkdown("1. ", "\n")} title="Ordered List">
              <ListOrdered className="h-4 w-4" />
            </Button>
            <div className="h-4 w-px bg-neutral-200 mx-1"></div>
            <Button variant="ghost" size="sm" onClick={() => insertMarkdown("> ", "\n")} title="Blockquote">
              <span className="text-lg font-serif">"</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={() => insertMarkdown("`", "`")} title="Inline Code">
              <Code className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => insertMarkdown("```\n", "\n```")} title="Code Block">
              <span className="font-mono text-xs">{"{ }"}</span>
            </Button>

            <div className="ml-auto flex items-center text-xs text-neutral-500">
              <span>{wordCount} words</span>
              <span className="mx-2">•</span>
              <span>{charCount} characters</span>
            </div>
          </div>

          <Tabs defaultValue="write" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="write">Write</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="write" className="p-0">
              <textarea
                id="markdown-editor"
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="w-full h-[70vh] p-4 font-mono text-sm resize-none focus:outline-none"
                placeholder="Start writing in Markdown..."
              />
            </TabsContent>
            <TabsContent value="preview" className="p-0">
              <div
                className="w-full h-[70vh] p-4 overflow-auto prose prose-neutral max-w-none"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }}
              />
            </TabsContent>
          </Tabs>

          <div className="flex justify-between items-center p-4 border-t border-neutral-200 bg-neutral-50">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                New Document
              </Button>
              <Button variant="outline" size="sm">
                Export as PDF
              </Button>
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2"
              >
                {showPreview ? (
                  <>
                    <EyeOff className="h-4 w-4" />
                    Hide Preview
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4" />
                    Show Preview
                  </>
                )}
              </Button>
              <Button
                onClick={handleSave}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-neutral-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-1 mb-4 md:mb-0">
              <span className="font-bold">Running</span>
              <span>Buddies Podcast</span>
            </div>
            <div className="flex space-x-6">
              <a href="/" className="text-sm text-neutral-500 hover:text-black">
                Home
              </a>
              <a href="/podcast" className="text-sm text-neutral-500 hover:text-black">
                Podcast
              </a>
              <a href="/blog" className="text-sm text-neutral-500 hover:text-black">
                Blog
              </a>
              <a href="/about" className="text-sm text-neutral-500 hover:text-black">
                About
              </a>
              <a href="/contact" className="text-sm text-neutral-500 hover:text-black">
                Contact
              </a>
            </div>
            <div className="mt-4 md:mt-0 text-sm text-neutral-500">
              © {new Date().getFullYear()} Running Buddies. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
