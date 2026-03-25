import type {TypedObject} from '@portabletext/types'

export type Profile = {
  name: string | null
  role: string | null
  headline: string | null
  bio: string | null
  photo: {asset?: {_ref: string}} | null
  email: string | null
  github: string | null
  linkedin: string | null
  twitter: string | null
}

export type Project = {
  _id: string
  title: string | null
  slug: string | null
  summary: string | null
  image: {asset?: {_ref: string}} | null
  url: string | null
  tags: string[] | null
}

export type PostSummary = {
  _id: string
  title: string | null
  slug: string | null
  publishedAt: string | null
  excerpt: string | null
}

export type PostDetail = PostSummary & {
  body: TypedObject[] | null
}
