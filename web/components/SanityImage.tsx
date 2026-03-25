import Image from 'next/image'
import type {SanityImageSource} from '@sanity/image-url'
import {urlFor} from '@/lib/sanity'

type Props = {
  value: SanityImageSource
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
}

export function SanityImage({value, alt, width, height, className, priority}: Props) {
  const src = urlFor(value).width(width * 2).height(height * 2).auto('format').url()
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes="(max-width: 768px) 100vw, 480px"
    />
  )
}
