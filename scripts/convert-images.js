const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

// Images to optimize
const imagesToOptimize = [
  {
    input: 'public/hero.jpg',
    output: 'public/hero.webp',
    quality: 80,
    width: 1920
  },
  {
    input: 'public/finca-guano.jpg',
    output: 'public/finca-guano.webp',
    quality: 80,
    width: 1200
  },
  {
    input: 'public/forest-hikers.jpg',
    output: 'public/forest-hikers.webp',
    quality: 85,
    width: 800
  }
]

async function convertToWebP(inputPath, outputPath, quality = 80, width = null) {
  try {
    console.log(`🔄 Converting ${inputPath} to WebP...`)
    
    let pipeline = sharp(inputPath)
    
    if (width) {
      pipeline = pipeline.resize(width, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
    }
    
    await pipeline
      .webp({ quality })
      .toFile(outputPath)
    
    // Get file sizes
    const originalSize = fs.statSync(inputPath).size
    const newSize = fs.statSync(outputPath).size
    const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1)
    
    console.log(`✅ Converted ${inputPath}`)
    console.log(`   Original: ${(originalSize / 1024 / 1024).toFixed(2)} MB`)
    console.log(`   WebP: ${(newSize / 1024 / 1024).toFixed(2)} MB`)
    console.log(`   Reduction: ${reduction}%`)
    console.log('')
    
  } catch (error) {
    console.error(`❌ Error converting ${inputPath}:`, error.message)
  }
}

async function optimizeImages() {
  console.log('🚀 Starting image optimization...\n')
  
  for (const image of imagesToOptimize) {
    if (fs.existsSync(image.input)) {
      await convertToWebP(image.input, image.output, image.quality, image.width)
    } else {
      console.log(`⚠️  File not found: ${image.input}`)
    }
  }
  
  console.log('🎉 Image optimization completed!')
}

// Run the optimization
optimizeImages().catch(console.error)
