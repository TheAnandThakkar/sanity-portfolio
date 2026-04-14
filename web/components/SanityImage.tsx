import Image from 'next/image'
import type {SanityImageSource} from '@sanity/image-url'
import {thumbnailUrl, urlFor} from '@/lib/sanity'

type Props = {
  value: SanityImageSource
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  /** Cropped thumbnail (hotspot-aware); use for home/blog lists. */
  variant?: 'default' | 'thumbnail'
}

export function SanityImage({
  value,
  alt,
  width,
  height,
  className,
  priority,
  variant = 'default',
}: Props) {
  const src =
    variant === 'thumbnail'
      ? thumbnailUrl(value, width, height)
      : urlFor(value).width(width * 2).height(height * 2).auto('format').url()
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={
        variant === 'thumbnail'
          ? '(max-width: 640px) 30vw, 140px'
          : '(max-width: 768px) 100vw, 480px'
      }
    />
  )
}
