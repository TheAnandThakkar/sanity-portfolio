import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {PortableBody} from '@/components/PortableBody'
import {client} from '@/lib/sanity'
import {postBySlugQuery, postsIndexQuery} from '@/lib/queries'
import type {PostDetail, PostSummary} from '@/types/sanity'

export const revalidate = 60

type Props = {params: Promise<{slug: string}>}

export async function generateStaticParams() {
  const posts = await client.fetch<PostSummary[]>(postsIndexQuery)
  return posts
    .filter((p) => p.slug)
    .map((p) => ({
      slug: p.slug as string,
    }))
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params
  const post = await client.fetch<PostDetail | null>(postBySlugQuery, {slug})
  if (!post?.title) return {title: 'Post'}
  return {
    title: post.title,
    description: post.excerpt || undefined,
  }
}

export default async function BlogPostPage({params}: Props) {
  const {slug} = await params
  const post = await client.fetch<PostDetail | null>(postBySlugQuery, {slug})

  if (!post) {
    notFound()
  }

  return (
    <article className="mx-auto max-w-2xl px-5 pb-20 pt-10">
      <header className="mb-10">
        <time className="text-sm text-foreground/50" dateTime={post.publishedAt || undefined}>
          {post.publishedAt
            ? new Date(post.publishedAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : ''}
        </time>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{post.title}</h1>
        {post.excerpt && <p className="mt-4 text-lg text-foreground/70">{post.excerpt}</p>}
      </header>
      {post.body && post.body.length > 0 ? <PortableBody value={post.body} /> : null}
    </article>
  )
}
