import {createClient} from '@sanity/client'
import {createImageUrlBuilder, type SanityImageSource} from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

if (!projectId || !dataset) {
  throw new Error(
    'Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET. Copy env.local.example to .env.local.',
  )
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = createImageUrlBuilder({projectId, dataset})

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

/**
 * Fixed-size thumbnail URL for list cards and previews. Uses `fit('crop')` so
 * Studio hotspot/crop on the image document is respected (set via hero image field).
 * GROQ should return the full image object (e.g. `heroImage`), not only `asset._ref`.
 */
export function thumbnailUrl(source: SanityImageSource, width: number, height: number): string {
  return builder
    .image(source)
    .width(Math.round(width * 2))
    .height(Math.round(height * 2))
    .fit('crop')
    .auto('format')
    .quality(85)
    .url()
}
