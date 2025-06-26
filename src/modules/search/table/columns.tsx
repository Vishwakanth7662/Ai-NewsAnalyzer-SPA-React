// "use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { type ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Article = {
  title: string
  description: string | null
  pubDate: string
  language: string
  country: string[]
  category: string[]
  sentiment: string
  image_url: string | null
  source_url: string
}

export const columns: ColumnDef<Article>[] = [
  {
    accessorKey: "image_url",
    header: "Image",
    cell: ({ getValue }) => {
      const url = getValue() as string | null;
      return url ? (
        <div className="aspect-video min-h-[120px] w-full max-w-[213px] flex items-center justify-center overflow-hidden bg-gray-100 rounded">
          <img
            src={url}
            alt="article"
            className="object-cover w-full h-full"
            style={{ aspectRatio: '16/9', minHeight: 120 }}
          />
        </div>
      ) : null;
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ getValue }) => <span className="whitespace-pre-line break-words max-w-xs inline-block">{getValue() as string}</span>,
  },
  {
    accessorKey: "description",
    header: "Description",
    // cell: ({ getValue }) => <span className="whitespace-pre-line break-words max-w-md inline-block">{getValue() as string}</span>,
    cell: ({row, getValue }) => <span className="whitespace-pre-line break-words max-w-xs inline-block">
      <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@nextjs</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">
              {getValue() as string}
            </p>
            <div className="text-muted-foreground text-xs">
              {row.getValue('pubDate')}
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
    </span>,
  },
  {
    accessorKey: "pubDate",
    header: "Published Date",
  },
  {
    accessorKey: "language",
    header: "Language",
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ getValue }) => Array.isArray(getValue() as unknown) ? (getValue() as string[]).join(", ") : String(getValue()),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ getValue }) => Array.isArray(getValue() as unknown) ? (getValue() as string[]).join(", ") : String(getValue()),
  },
  {
    accessorKey: "sentiment",
    header: "Sentiment",
  },
  {
    accessorKey: "source_url",
    header: "Source",
    cell: ({ getValue }) => <a href={getValue() as string} target="_blank" rel="noopener noreferrer" className="break-all inline-block max-w-xs">Link</a>,
  },
]