import Link from 'next/link'
import {SanityImage} from '@/components/SanityImage'
import {client} from '@/lib/sanity'
import {postsIndexQuery} from '@/lib/queries'
import type {PostSummary} from '@/types/sanity'

export const revalidate = 60

export default async function BlogIndexPage() {
  const posts = await client.fetch<PostSummary[]>(postsIndexQuery)

  return (
    <main className="mx-auto max-w-4xl px-5 pb-20 pt-10">
      <h1 className="text-4xl font-semibold tracking-tight">Blog</h1>
      <p className="mt-3 max-w-2xl text-foreground/65">
        Notes from building my first Sanity + Next.js project. I use this space to share practical
        learnings from schema design, GROQ queries, and frontend implementation.
      </p>

      <ul className="mt-10 space-y-6">
        {posts.map((post) => (
          <li key={post._id}>
            <Link
              href={post.slug ? `/blog/${post.slug}` : '#'}
              className="group block overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.02] transition hover:border-foreground/20 hover:bg-foreground/[0.04]"
            >
              {post.heroImage?.asset && (
                <SanityImage
                  value={post.heroImage}
                  alt={post.heroImage.alt || post.title || 'Post hero image'}
                  width={1280}
                  height={640}
                  className="h-56 w-full object-cover"
                />
              )}
              <div className="p-6">
                <time className="text-xs text-foreground/45" dateTime={post.publishedAt || undefined}>
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : ''}
                </time>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight group-hover:underline">{post.title}</h2>
                {post.excerpt && <p className="mt-3 text-foreground/70">{post.excerpt}</p>}
                {post.author?.name && (
                  <p className="mt-4 text-sm text-foreground/55">
                    By <span className="font-medium text-foreground/75">{post.author.name}</span>
                    {post.author.title ? ` · ${post.author.title}` : ''}
                  </p>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {posts.length === 0 && (
        <p className="mt-10 text-foreground/60">No posts yet — publish posts from Sanity Studio.</p>
      )}
    </main>
  )
}
