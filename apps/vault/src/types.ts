export type ObsidianFolder = {
  name: string
  level: number
  // Extracted from .meta.json
  meta: {
    uuid: string
    description: string
    other: {
      [key: string]: string
    }
  }

  // Each file in this object is direct child,
  // with the key being the file name and the value being the content
  files: {
    uuid: string
    filename: string
    content: string
  }[]

  // Sub folders
  subfolders: ObsidianFolder[]
}

export type PBVaultFolder = {
  uuid: string
  filename: string
  parentId?: string
  meta: Record<string, unknown>
}
