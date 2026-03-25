import Link from 'next/link'

const links = [
  {href: '/', label: 'Home'},
  {href: '/projects', label: 'Projects'},
  {href: '/blog', label: 'Blog'},
]

export function SiteHeader() {
  return (
    <header className="border-b border-foreground/10">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-6 px-5 py-5">
        <Link href="/" className="font-semibold tracking-tight text-foreground">
          Anand Thakkar
        </Link>
        <nav className="flex gap-6 text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-foreground/70 transition hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
