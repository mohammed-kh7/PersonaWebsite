/**
 * Image Optimization Script
 * Converts all JPG/PNG images in public/ to WebP format.
 *
 * Usage:
 *   node scripts/optimize-images.mjs
 *
 * Requires: npm install --save-dev sharp
 */
import sharp from 'sharp'
import { readdirSync, statSync } from 'fs'
import { join, extname, basename } from 'path'

const DIRS = [
  'public/images',
  'public/images/projects',
]

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png'])

let totalOriginal = 0
let totalWebP = 0
let count = 0

for (const dir of DIRS) {
  let files
  try {
    files = readdirSync(dir)
  } catch {
    console.warn(`⚠️  Skipping "${dir}" — directory not found`)
    continue
  }

  for (const file of files) {
    const ext = extname(file).toLowerCase()
    if (!IMAGE_EXTS.has(ext)) continue

    const input  = join(dir, file)
    const output = join(dir, basename(file, ext) + '.webp')

    const originalSize = statSync(input).size

    await sharp(input)
      .webp({ quality: 82 })   // 82 = best balance of quality vs. file size
      .toFile(output)

    const webpSize = statSync(output).size
    const saving   = (((originalSize - webpSize) / originalSize) * 100).toFixed(1)

    totalOriginal += originalSize
    totalWebP     += webpSize
    count++

    console.log(
      `✓ ${file.padEnd(35)} ${(originalSize / 1024).toFixed(0).padStart(6)} KB → ${(webpSize / 1024).toFixed(0).padStart(5)} KB  (-${saving}%)`
    )
  }
}

console.log('\n' + '─'.repeat(60))
const totalSaving = (((totalOriginal - totalWebP) / totalOriginal) * 100).toFixed(1)
console.log(`✅ ${count} images optimized`)
console.log(`   Total: ${(totalOriginal / 1024).toFixed(0)} KB → ${(totalWebP / 1024).toFixed(0)} KB  (saved ${totalSaving}%)`)
console.log('\nNext step: update Hero.tsx and Projects.tsx to use <picture> + .webp sources')
