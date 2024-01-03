import type { CoreSchema } from '@directus/sdk'

type Status = 'draft' | 'released' | null

export type Schema = {
  subject: Subject[]
  subject_section: SubjectSection[]
} & CoreSchema

export type Subject = {
  id: string
  icon: string | null
  status: Status | null
  label: string
  description: string | null
}
export type SubjectSection = {
  id: string
  sort: null
  label: string
  description: string | null
  thumbnail: string
  requires_subscription: string
  subject: Subject
  status: Status
  top_level: boolean
  parent: SubjectSection
  children: SubjectSection[] 
}
