import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET

if (!projectId || !dataset) {
  throw new Error(
    'Missing Sanity env vars. Copy .env.example to .env and set SANITY_STUDIO_PROJECT_ID and SANITY_STUDIO_DATASET.',
  )
}

export default defineConfig({
  name: 'default',
  title: 'portfolio',

  projectId,
  dataset,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
