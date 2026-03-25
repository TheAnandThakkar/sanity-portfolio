import {SanityImage} from '@/components/SanityImage'
import {client} from '@/lib/sanity'
import {projectsQuery} from '@/lib/queries'
import type {Project} from '@/types/sanity'

export const revalidate = 60

export default async function ProjectsPage() {
  const projects = await client.fetch<Project[]>(projectsQuery)

  return (
    <main className="mx-auto max-w-3xl px-5 pb-20 pt-10">
      <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
      <p className="mt-2 text-foreground/65">Selected work and experiments.</p>

      <ul className="mt-10 space-y-10">
        {projects.map((p) => (
          <li key={p._id} className="border-b border-foreground/10 pb-10 last:border-0">
            <div className="flex flex-col gap-4 sm:flex-row">
              {p.image && (
                <div className="sm:w-2/5">
                  <SanityImage
                    value={p.image}
                    alt={p.title || 'Project'}
                    width={480}
                    height={270}
                    className="w-full rounded-xl border border-foreground/10 object-cover"
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-semibold">{p.title}</h2>
                {p.summary && <p className="mt-2 text-foreground/80">{p.summary}</p>}
                {p.tags && p.tags.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-foreground/5 px-2.5 py-0.5 text-xs text-foreground/70"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
                {p.url && (
                  <a
                    href={p.url}
                    className="mt-4 inline-block text-sm font-medium text-foreground underline decoration-foreground/25 underline-offset-4 hover:decoration-foreground"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Open project
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {projects.length === 0 && (
        <p className="mt-10 text-foreground/60">No projects yet — add some in Sanity Studio.</p>
      )}
    </main>
  )
}
