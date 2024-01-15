import type { CoreSchema } from '@directus/sdk'

type Status = 'draft' | 'published' | 'archived'

export type Schema = {
  subject: Subject[]
  sub_subject: SubSubject[]
  chapter: Chapter[]
  lesson: Lesson[]
  lesson_chunk: LessonChunk[]
} & CoreSchema

export type Subject = {
  id: string
  label: string
  icon: string
  sub_subjects: SubSubject[] | null
  status: Status
}

export type SubSubject = {
  id: string
  label: string
  icon: string
  status: Status
  chapters: Chapter[]
}

export type Chapter = {
  id: string
  label: string
  icon: string
  sub_subject: SubSubject
  lessons:Lesson[]
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
