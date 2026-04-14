import Link from 'next/link'
import {SanityImage} from '@/components/SanityImage'
import {client} from '@/lib/sanity'
import {postsIndexQuery, profileQuery} from '@/lib/queries'
import type {PostSummary, Profile} from '@/types/sanity'

export const revalidate = 60

export default async function HomePage() {
  const [profile, posts] = await Promise.all([
    client.fetch<Profile | null>(profileQuery),
    client.fetch<PostSummary[]>(postsIndexQuery),
  ])

  const recentPosts = posts.slice(0, 3)

  return (
    <main className="mx-auto max-w-3xl px-5 pb-20 pt-10">
      <section className="mb-10 flex flex-col gap-8 sm:flex-row sm:items-start">
        {profile?.photo && (
          <div className="shrink-0">
            <SanityImage
              value={profile.photo}
              alt={profile.name || 'Profile photo'}
              width={220}
              height={220}
              className="h-44 w-44 rounded-3xl border border-foreground/10 object-cover shadow-sm sm:h-56 sm:w-56"
              priority
            />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium uppercase tracking-wider text-foreground/50">
            {profile?.role || 'Software developer'}
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
            {profile?.headline || profile?.name || 'Anand Thakkar'}
          </h1>
          {profile?.bio && (
            <div className="mt-5 text-sm leading-relaxed text-foreground/80">
              {profile.bio}
            </div>
          )}
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                className="text-foreground underline decoration-foreground/25 underline-offset-4 hover:decoration-foreground"
              >
                Email
              </a>
            )}
            {profile?.github && (
              <a
                href={profile.github}
                className="text-foreground underline decoration-foreground/25 underline-offset-4 hover:decoration-foreground"
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub
              </a>
            )}
            {profile?.linkedin && (
              <a
                href={profile.linkedin}
                className="text-foreground underline decoration-foreground/25 underline-offset-4 hover:decoration-foreground"
                rel="noopener noreferrer"
                target="_blank"
              >
                LinkedIn
              </a>
            )}
            {profile?.twitter && (
              <a
                href={profile.twitter}
                className="text-foreground underline decoration-foreground/25 underline-offset-4 hover:decoration-foreground"
                rel="noopener noreferrer"
                target="_blank"
              >
                X
              </a>
            )}
          </div>
        </div>
      </section>

      {recentPosts.length > 0 && (
        <section>
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <h2 className="text-lg font-semibold tracking-tight">Writing</h2>
            <Link href="/blog" className="text-sm text-foreground/60 hover:text-foreground">
              All posts
            </Link>
          </div>
          <ul className="space-y-4">
            {recentPosts.map((post) => {
              const authorAvatar =
                post.author?.image?.asset != null ? post.author.image : profile?.photo
              const bylineName = post.author?.name ?? profile?.name ?? 'Anand Thakkar'
              const showAuthorRow = Boolean(post.author?.name || authorAvatar?.asset)
              return (
                <li key={post._id}>
                  <Link
                    href={post.slug ? `/blog/${post.slug}` : '#'}
                    className="group flex gap-4 rounded-xl border border-foreground/10 bg-foreground/[0.02] p-4 transition hover:border-foreground/20 hover:bg-foreground/[0.04]"
                  >
                    {post.heroImage?.asset && (
                      <div className="shrink-0">
                        <SanityImage
                          variant="thumbnail"
                          value={post.heroImage}
                          alt={post.heroImage.alt || post.title || 'Post thumbnail'}
                          width={140}
                          height={84}
                          className="h-[4.5rem] w-[7.5rem] rounded-xl border border-foreground/10 object-cover sm:h-[5.25rem] sm:w-[8.75rem]"
                        />
                      </div>
                    )}
                    <div className="flex min-w-0 flex-1 flex-col">
                      <h3 className="text-lg font-semibold group-hover:underline">{post.title}</h3>
                      {post.excerpt && (
                        <p className="mt-1 line-clamp-2 text-sm text-foreground/65">{post.excerpt}</p>
                      )}
                      <div className="mt-auto flex items-center justify-between gap-4 pt-3">
                        <p className="text-left text-xs text-foreground/45">
                          {post.publishedAt
                            ? new Date(post.publishedAt).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })
                            : ''}
                        </p>
                        {showAuthorRow && (
                          <div className="flex shrink-0 items-center justify-end gap-2 text-right">
                            {authorAvatar?.asset && (
                              <SanityImage
                                variant="thumbnail"
                                value={authorAvatar}
                                alt={bylineName}
                                width={28}
                                height={28}
                                className="h-6 w-6 shrink-0 rounded-full border border-foreground/10 object-cover"
                              />
                            )}
                            <p className="text-xs uppercase tracking-wide text-foreground/50">
                              By {bylineName}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      )}
    </main>
  )
}
