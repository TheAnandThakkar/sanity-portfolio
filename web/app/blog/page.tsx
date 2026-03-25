import Link from 'next/link'
import {client} from '@/lib/sanity'
import {postsIndexQuery} from '@/lib/queries'
import type {PostSummary} from '@/types/sanity'

export const revalidate = 60

export default async function BlogIndexPage() {
  const posts = await client.fetch<PostSummary[]>(postsIndexQuery)

  return (
    <main className="mx-auto max-w-3xl px-5 pb-20 pt-10">
      <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
      <p className="mt-2 text-foreground/65">Notes and longer-form writing.</p>

      <ul className="mt-10 divide-y divide-foreground/10">
        {posts.map((post) => (
          <li key={post._id} className="py-6 first:pt-0">
            <Link href={post.slug ? `/blog/${post.slug}` : '#'} className="group block">
              <time className="text-xs text-foreground/45" dateTime={post.publishedAt || undefined}>
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : ''}
              </time>
              <h2 className="mt-2 text-xl font-semibold group-hover:underline">{post.title}</h2>
              {post.excerpt && <p className="mt-2 text-foreground/70">{post.excerpt}</p>}
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
