import {PortableText, type PortableTextComponents} from '@portabletext/react'
import type {TypedObject} from '@portabletext/types'
import Image from 'next/image'
import type {SanityImageSource} from '@sanity/image-url'
import {urlFor} from '@/lib/sanity'

const components: PortableTextComponents = {
  block: {
    normal: ({children}) => <p className="mb-5 leading-relaxed text-foreground/90">{children}</p>,
    h1: ({children}) => (
      <h1 className="mb-6 mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{children}</h1>
    ),
    h2: ({children}) => (
      <h2 className="mt-12 mb-4 text-2xl font-semibold tracking-tight text-foreground">{children}</h2>
    ),
    h3: ({children}) => (
      <h3 className="mt-8 mb-3 text-xl font-semibold tracking-tight text-foreground">{children}</h3>
    ),
    blockquote: ({children}) => (
      <blockquote className="my-6 border-l-2 border-foreground/25 pl-5 italic text-foreground/80">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({children}) => <ul className="mb-5 ml-5 list-disc space-y-2">{children}</ul>,
    number: ({children}) => <ol className="mb-5 ml-5 list-decimal space-y-2">{children}</ol>,
  },
  marks: {
    strong: ({children}) => <strong className="font-semibold">{children}</strong>,
    em: ({children}) => <em className="italic">{children}</em>,
    code: ({children}) => (
      <code className="rounded bg-foreground/10 px-1.5 py-0.5 font-mono text-sm">{children}</code>
    ),
    link: ({children, value}) => {
      const href = value?.href as string | undefined
      if (!href) return <>{children}</>
      const external = !href.startsWith('/')
      return (
        <a
          href={href}
          className="text-foreground underline decoration-foreground/30 underline-offset-4 transition hover:decoration-foreground"
          rel={external ? 'noopener noreferrer' : undefined}
          target={external ? '_blank' : undefined}
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({value}) => {
      if (!value || typeof value !== 'object' || !('asset' in value) || !value.asset) return null
      const src = value as SanityImageSource & {alt?: string}
      const w = 800
      const url = urlFor(src).width(w).auto('format').url()
      return (
        <figure className="my-8">
          <Image
            src={url}
            alt={src.alt || ''}
            width={w}
            height={Math.round(w * 0.56)}
            className="w-full rounded-lg border border-foreground/10"
            sizes="(max-width: 768px) 100vw, 720px"
          />
        </figure>
      )
    },
  },
}

export function PortableBody({value}: {value: TypedObject[]}) {
  return <PortableText value={value} components={components} />
}
