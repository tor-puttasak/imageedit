import { Storage } from '@google-cloud/storage'

let storage: Storage

if (process.env.GCS_CREDENTIALS_JSON) {
  try {
    // Try to parse as JSON first (for inline credentials)
    const credentials = JSON.parse(process.env.GCS_CREDENTIALS_JSON)
    storage = new Storage({
      projectId: process.env.GCS_PROJECT_ID,
      credentials,
    })
  } catch {
    // If parsing fails, treat as file path
    storage = new Storage({
      projectId: process.env.GCS_PROJECT_ID,
      keyFilename: process.env.GCS_CREDENTIALS_JSON,
    })
  }
} else {
  // Default authentication (uses GOOGLE_APPLICATION_CREDENTIALS env var)
  storage = new Storage({
    projectId: process.env.GCS_PROJECT_ID,
  })
}

const bucketName = process.env.GCS_BUCKET_NAME || ''

export async function uploadToGCS(
  file: Buffer,
  fileName: string,
  contentType: string
): Promise<string> {
  const bucket = storage.bucket(bucketName)
  const blob = bucket.file(fileName)

  await blob.save(file, {
    contentType,
    metadata: {
      cacheControl: 'public, max-age=31536000',
    },
  })

  // Make the file public
  await blob.makePublic()

  // Return public URL
  return `https://storage.googleapis.com/${bucketName}/${fileName}`
}

export async function deleteFromGCS(fileName: string): Promise<void> {
  const bucket = storage.bucket(bucketName)
  await bucket.file(fileName).delete()
}
