import type { CoreSchema } from '@directus/sdk'

type Status = 'draft' | 'published' | 'archived'

export type Schema = {
  subject: Subject[]
  chapter: Chapter[]
  lesson: Lesson[]
  lesson_chunk: LessonChunk[]
} & CoreSchema

export type Subject = {
  id: string
  icon: string | null
  status: Status | null
  label: string
  description: string | null
}
export type Chapter = {
  id: string
  label: string
  subject: Subject
  svg_icon: string | null
  description: string | null
  sub_chapters: Chapter[]
  parent_chapter: Chapter
  lessons: Lesson[]
  status: Status
  sort: null
}

export type Lesson = {
  id: string
  label: string
  lesson_chunks: LessonChunk[]
  chapter: Chapter
  status: Status
}

export type LessonChunk = {
  id: string
  label: string
  lesson: Lesson
  status: Status
}
