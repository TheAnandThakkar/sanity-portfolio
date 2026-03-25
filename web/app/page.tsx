import Link from 'next/link'
import {SanityImage} from '@/components/SanityImage'
import {client} from '@/lib/sanity'
import {postsIndexQuery, profileQuery, projectsQuery} from '@/lib/queries'
import type {PostSummary, Profile, Project} from '@/types/sanity'

export const revalidate = 60

export default async function HomePage() {
  const [profile, projects, posts] = await Promise.all([
    client.fetch<Profile | null>(profileQuery),
    client.fetch<Project[]>(projectsQuery),
    client.fetch<PostSummary[]>(postsIndexQuery),
  ])

  const featuredProjects = projects.slice(0, 4)
  const recentPosts = posts.slice(0, 2)

  return (
    <main className="mx-auto max-w-3xl px-5 pb-20 pt-10">
      <section className="mb-16 flex flex-col gap-8 sm:flex-row sm:items-start">
        {profile?.photo && (
          <div className="shrink-0">
            <SanityImage
              value={profile.photo}
              alt={profile.name || 'Profile photo'}
              width={120}
              height={120}
              className="rounded-2xl border border-foreground/10 object-cover"
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
            <p className="mt-4 max-w-xl text-pretty leading-relaxed text-foreground/80">{profile.bio}</p>
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

      {featuredProjects.length > 0 && (
        <section className="mb-16">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <h2 className="text-lg font-semibold tracking-tight">Projects</h2>
            <Link href="/projects" className="text-sm text-foreground/60 hover:text-foreground">
              View all
            </Link>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {featuredProjects.map((p) => (
              <li
                key={p._id}
                className="rounded-xl border border-foreground/10 bg-foreground/[0.02] p-4 transition hover:border-foreground/20"
              >
                {p.image && (
                  <SanityImage
                    value={p.image}
                    alt={p.title || 'Project'}
                    width={400}
                    height={200}
                    className="mb-3 h-32 w-full rounded-lg object-cover"
                  />
                )}
                <h3 className="font-medium">{p.title}</h3>
                {p.summary && (
                  <p className="mt-1 line-clamp-2 text-sm text-foreground/65">{p.summary}</p>
                )}
                {p.url && (
                  <a
                    href={p.url}
                    className="mt-2 inline-block text-sm text-foreground/70 underline decoration-foreground/20 underline-offset-4 hover:text-foreground"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Visit
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {recentPosts.length > 0 && (
        <section>
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <h2 className="text-lg font-semibold tracking-tight">Writing</h2>
            <Link href="/blog" className="text-sm text-foreground/60 hover:text-foreground">
              All posts
            </Link>
          </div>
          <ul className="space-y-4">
            {recentPosts.map((post) => (
              <li key={post._id}>
                <Link
                  href={post.slug ? `/blog/${post.slug}` : '#'}
                  className="group block rounded-lg border border-transparent px-2 py-3 transition hover:border-foreground/10 hover:bg-foreground/[0.03]"
                >
                  <p className="text-xs text-foreground/45">
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })
                      : ''}
                  </p>
                  <h3 className="mt-1 font-medium group-hover:underline">{post.title}</h3>
                  {post.excerpt && (
                    <p className="mt-1 line-clamp-2 text-sm text-foreground/65">{post.excerpt}</p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  )
}
