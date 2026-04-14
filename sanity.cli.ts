import {defineCliConfig} from 'sanity/cli'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET

if (!projectId || !dataset) {
  throw new Error(
    'Missing Sanity env vars. Copy .env.example to .env and set SANITY_STUDIO_PROJECT_ID and SANITY_STUDIO_DATASET.',
  )
}

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  deployment: {
    
    autoUpdates: true,
  }
})
