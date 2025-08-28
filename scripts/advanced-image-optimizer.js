const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

// Advanced optimization configurations
const optimizationConfigs = {
  webp: {
    quality: 80,
    effort: 6, // Higher effort = better compression
    nearLossless: true,
    smartSubsample: true
  },
  avif: {
    quality: 80,
    effort: 6,
    chromaSubsampling: '4:2:0'
  },
  jpeg: {
    quality: 85,
    progressive: true,
    mozjpeg: true,
    trellisQuantisation: true,
    overshootDeringing: true,
    optimizeScans: true
  }
}

// Images to optimize with multiple formats
const imagesToOptimize = [
  {
    input: 'public/hero.jpg',
    outputs: [
      { format: 'webp', suffix: '.webp' },
      { format: 'avif', suffix: '.avif' },
      { format: 'jpeg', suffix: '-optimized.jpg' }
    ],
    sizes: [
      { width: 1920, suffix: '-large' },
      { width: 1200, suffix: '-medium' },
      { width: 800, suffix: '-small' }
    ]
  },
  {
    input: 'public/finca-guano.jpg',
    outputs: [
      { format: 'webp', suffix: '.webp' },
      { format: 'avif', suffix: '.avif' },
      { format: 'jpeg', suffix: '-optimized.jpg' }
    ],
    sizes: [
      { width: 1200, suffix: '-large' },
      { width: 800, suffix: '-medium' },
      { width: 600, suffix: '-small' }
    ]
  },
  {
    input: 'public/forest-hikers.jpg',
    outputs: [
      { format: 'webp', suffix: '.webp' },
      { format: 'avif', suffix: '.avif' },
      { format: 'jpeg', suffix: '-optimized.jpg' }
    ],
    sizes: [
      { width: 800, suffix: '-large' },
      { width: 600, suffix: '-medium' },
      { width: 400, suffix: '-small' }
    ]
  }
]

async function optimizeImage(inputPath, outputPath, format, config, width = null) {
  try {
    console.log(`🔄 Optimizing ${path.basename(inputPath)} to ${format.toUpperCase()}...`)
    
    let pipeline = sharp(inputPath)
    
    // Resize if width specified
    if (width) {
      pipeline = pipeline.resize(width, null, {
        withoutEnlargement: true,
        fit: 'inside',
        kernel: sharp.kernel.lanczos3 // Better quality resizing
      })
    }
    
    // Apply format-specific optimizations
    switch (format) {
      case 'webp':
        pipeline = pipeline.webp(config)
        break
      case 'avif':
        pipeline = pipeline.avif(config)
        break
      case 'jpeg':
        pipeline = pipeline.jpeg(config)
        break
    }
    
    // Remove metadata for smaller files
    pipeline = pipeline.withMetadata(false)
    
    await pipeline.toFile(outputPath)
    
    // Get file sizes
    const originalSize = fs.statSync(inputPath).size
    const newSize = fs.statSync(outputPath).size
    const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1)
    
    console.log(`✅ ${format.toUpperCase()}: ${(newSize / 1024 / 1024).toFixed(2)} MB (${reduction}% reduction)`)
    
    return { originalSize, newSize, reduction }
    
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath} to ${format}:`, error.message)
    return null
  }
}

async function generateResponsiveImages(inputPath, outputs, sizes) {
  const results = []
  const baseName = path.basename(inputPath, path.extname(inputPath))
  const dir = path.dirname(inputPath)
  
  for (const size of sizes) {
    for (const output of outputs) {
      const outputPath = path.join(dir, `${baseName}${size.suffix}${output.suffix}`)
      const config = optimizationConfigs[output.format]
      
      const result = await optimizeImage(
        inputPath, 
        outputPath, 
        output.format, 
        config, 
        size.width
      )
      
      if (result) {
        results.push({
          format: output.format,
          size: size.suffix,
          width: size.width,
          ...result
        })
      }
    }
  }
  
  return results
}

async function advancedImageOptimization() {
  console.log('🚀 Starting advanced image optimization (Squoosh-style)...\n')
  
  let totalOriginalSize = 0
  let totalOptimizedSize = 0
  
  for (const image of imagesToOptimize) {
    if (!fs.existsSync(image.input)) {
      console.log(`⚠️  File not found: ${image.input}`)
      continue
    }
    
    console.log(`📸 Processing: ${path.basename(image.input)}`)
    console.log('─'.repeat(50))
    
    const originalSize = fs.statSync(image.input).size
    totalOriginalSize += originalSize
    
    console.log(`📊 Original: ${(originalSize / 1024 / 1024).toFixed(2)} MB`)
    
    const results = await generateResponsiveImages(
      image.input, 
      image.outputs, 
      image.sizes
    )
    
    // Calculate total optimized size for this image
    const imageOptimizedSize = results.reduce((sum, r) => sum + r.newSize, 0)
    totalOptimizedSize += imageOptimizedSize
    
    console.log('')
    
    // Show best result for each format
    const bestResults = {}
    results.forEach(r => {
      if (!bestResults[r.format] || r.reduction > bestResults[r.format].reduction) {
        bestResults[r.format] = r
      }
    })
    
    console.log('🏆 Best results:')
    Object.entries(bestResults).forEach(([format, result]) => {
      console.log(`   ${format.toUpperCase()}: ${result.reduction}% reduction`)
    })
    
    console.log('')
  }
  
  // Final summary
  const totalReduction = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1)
  
  console.log('🎉 Optimization Summary:')
  console.log('─'.repeat(50))
  console.log(`📊 Total original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`)
  console.log(`📊 Total optimized size: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`)
  console.log(`📊 Total reduction: ${totalReduction}%`)
  console.log(`💾 Space saved: ${((totalOriginalSize - totalOptimizedSize) / 1024 / 1024).toFixed(2)} MB`)
  
  console.log('\n💡 Next steps:')
  console.log('1. Update image components to use WebP/AVIF with fallbacks')
  console.log('2. Implement responsive images with srcset')
  console.log('3. Add lazy loading for better performance')
}

// Run the advanced optimization
advancedImageOptimization().catch(console.error)
