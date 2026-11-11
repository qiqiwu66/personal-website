import sharp from "sharp"
import { readdir, stat, writeFile, readFile } from "fs/promises"
import { join, extname } from "path"

const IMAGES_DIR = "public/images"
const MANIFEST_PATH = "scripts/.compress-manifest.json"
const MAX_WIDTH = 1800
const JPEG_QUALITY = 82
const WEBP_QUALITY = 82
const PNG_QUALITY = 90

async function getAllImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await getAllImages(full)))
    } else if (/\.(jpe?g|png|webp)$/i.test(entry.name)) {
      files.push(full)
    }
  }
  return files
}

async function loadManifest() {
  try {
    return JSON.parse(await readFile(MANIFEST_PATH, "utf8"))
  } catch {
    return {}
  }
}

async function main() {
  const manifest = await loadManifest()
  const images = await getAllImages(IMAGES_DIR)

  let skipped = 0
  let compressed = 0
  let totalSaved = 0

  for (const file of images) {
    const { mtimeMs, size: originalSize } = await stat(file)
    const key = file

    if (manifest[key] && manifest[key].mtime === mtimeMs) {
      skipped++
      continue
    }

    const ext = extname(file).toLowerCase()
    let pipeline = sharp(file).resize({ width: MAX_WIDTH, withoutEnlargement: true })

    if (ext === ".png") {
      pipeline = pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9 })
    } else if (ext === ".webp") {
      pipeline = pipeline.webp({ quality: WEBP_QUALITY })
    } else {
      pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    }

    const output = await pipeline.toBuffer()

    if (output.length < originalSize) {
      await writeFile(file, output)
      const saved = originalSize - output.length
      totalSaved += saved
      console.log(`✓ ${file} ${(originalSize / 1024).toFixed(0)}KB → ${(output.length / 1024).toFixed(0)}KB (saved ${(saved / 1024).toFixed(0)}KB)`)
    } else {
      console.log(`~ ${file} already small, skipping overwrite`)
    }

    manifest[key] = { mtime: mtimeMs }
    compressed++
  }

  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2))
  console.log(`\nDone. ${compressed} processed, ${skipped} unchanged. Total saved: ${(totalSaved / 1024 / 1024).toFixed(1)}MB`)
}

main().catch(console.error)
