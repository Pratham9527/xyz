"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"
import {
  Type,
  ImageIcon,
  Link,
  Grid3X3,
  Columns,
  Quote,
  ListOrdered,
  Trash2,
  Copy,
  MoveUp,
  MoveDown,
  Send,
  Image,
  Text,
  Layout,
  GripVertical,
} from "lucide-react"
import { Card } from "@/components/ui/card"

export default function NewsletterBuilderPage() {
  const [blocks, setBlocks] = useState<Block[]>([
    {
      id: "block-1",
      type: "header",
      content: "Running Buddies Newsletter",
      settings: { align: "center", size: "large" },
    },
    {
      id: "block-2",
      type: "text",
      content: "Welcome to this week's running tips, news, and inspiration. We've got some great content for you!",
      settings: { align: "left" },
    },
    {
      id: "block-3",
      type: "image",
      content: "/placeholder.svg?height=400&width=800",
      settings: { caption: "Featured image: Morning trail run", width: "full" },
    },
    {
      id: "block-4",
      type: "header",
      content: "This Week's Featured Article",
      settings: { align: "left", size: "medium" },
    },
    {
      id: "block-5",
      type: "text",
      content:
        "Learn how proper breathing techniques can improve your running efficiency and endurance. Our expert coach shares tips that you can implement on your very next run.",
      settings: { align: "left" },
    },
    {
      id: "block-6",
      type: "button",
      content: "Read Full Article",
      settings: { url: "#", align: "center", style: "primary" },
    },
  ])

  const [editingBlock, setEditingBlock] = useState<string | null>(null)
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop")
  const [title, setTitle] = useState("")

  const blockTypes = [
    {
      type: "text",
      icon: Text,
      label: "Text Block",
      defaultContent: "Enter your text here..."
    },
    {
      type: "image",
      icon: Image,
      label: "Image Block",
      defaultContent: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"
    },
    {
      type: "layout",
      icon: Layout,
      label: "Layout Block",
      defaultContent: "Two Column Layout"
    }
  ]

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(blocks)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setBlocks(items)
  }

  const addBlock = (type: "text" | "image" | "layout") => {
    const blockType = blockTypes.find(bt => bt.type === type)
    if (!blockType) return

    const newBlock: Block = {
      id: `${type}-${Date.now()}`,
      type,
      content: blockType.defaultContent
    }

    setBlocks([...blocks, newBlock])
    setEditingBlock(newBlock.id)
  }

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(block => block.id !== id))
    if (editingBlock === id) {
      setEditingBlock(null)
    }
  }

  const updateBlockContent = (id: string, content: string) => {
    setBlocks(blocks.map(block =>
      block.id === id ? { ...block, content } : block
    ))
  }

  const updateBlockSettings = (id: string, settings: any) => {
    setBlocks(
      blocks.map((block) => (block.id === id ? { ...block, settings: { ...block.settings, ...settings } } : block)),
    )
  }

  const renderBlock = (block: Block) => {
    switch (block.type) {
      case "text":
        return (
          <Textarea
            value={block.content}
            onChange={(e) => updateBlockContent(block.id, e.target.value)}
            className="min-h-[100px]"
          />
        )
      case "image":
        return (
          <div className="space-y-2">
            <Input
              value={block.content}
              onChange={(e) => updateBlockContent(block.id, e.target.value)}
              placeholder="Enter image URL"
            />
            <img
              src={block.content}
              alt="Newsletter image"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )
      case "layout":
        return (
          <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
            <div className="border rounded p-4">
              <p className="text-gray-500">Left Column</p>
            </div>
            <div className="border rounded p-4">
              <p className="text-gray-500">Right Column</p>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Newsletter Builder</h1>

        <div className="mb-8">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Newsletter Title"
            className="text-2xl font-bold"
          />
        </div>

        <div className="flex gap-4 mb-8">
          {blockTypes.map(({ type, icon: Icon, label }) => (
            <Button
              key={type}
              variant="outline"
              onClick={() => addBlock(type as "text" | "image" | "layout")}
              className="flex items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Button>
          ))}
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="blocks">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
              >
                {blocks.map((block, index) => (
                  <Draggable key={block.id} draggableId={block.id} index={index}>
                    {(provided) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="p-4"
                      >
                        <div className="flex items-start gap-4">
                          <div
                            {...provided.dragHandleProps}
                            className="cursor-move p-2 hover:bg-gray-100 rounded"
                          >
                            <GripVertical className="h-5 w-5 text-gray-400" />
                          </div>
                          <div className="flex-1">
                            {renderBlock(block)}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeBlock(block.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className="mt-8 flex justify-end gap-4">
          <Button variant="outline">Save Draft</Button>
          <Button>Publish Newsletter</Button>
        </div>
      </div>
    </div>
  )
}

type BlockType = "header" | "text" | "image" | "button" | "divider" | "quote" | "list" | "columns"

interface Block {
  id: string
  type: BlockType
  content: string
  settings: any
}
