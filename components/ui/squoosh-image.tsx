import Image from 'next/image'
import { useState } from 'react'

interface SquooshImageProps {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  className?: string
  sizes?: string
  quality?: number
}

export function SquooshImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  sizes = '100vw',
  quality = 80
}: SquooshImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Generate multiple format sources
  const getImageSources = (originalSrc: string) => {
    const baseName = originalSrc.replace(/\.[^/.]+$/, '') // Remove extension
    
    return {
      avif: `${baseName}.avif`,
      webp: `${baseName}.webp`,
      jpeg: `${baseName}-optimized.jpg`,
      original: originalSrc
    }
  }

  const sources = getImageSources(src)
  
  // Generate responsive srcSet for different sizes
  const generateSrcSet = (format: string) => {
    const sizes = [400, 600, 800, 1200, 1920]
    return sizes
      .filter(size => size <= width)
      .map(size => `${sources[format as keyof typeof sources]}?w=${size} ${size}w`)
      .join(', ')
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <picture>
        {/* AVIF - Best compression, modern browsers */}
        <source
          type="image/avif"
          srcSet={generateSrcSet('avif')}
          sizes={sizes}
        />
        
        {/* WebP - Good compression, wide support */}
        <source
          type="image/webp"
          srcSet={generateSrcSet('webp')}
          sizes={sizes}
        />
        
        {/* Optimized JPEG - Fallback */}
        <source
          type="image/jpeg"
          srcSet={generateSrcSet('jpeg')}
          sizes={sizes}
        />
        
        {/* Original - Ultimate fallback */}
        <Image
          src={hasError ? sources.original : sources.jpeg}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          quality={quality}
          sizes={sizes}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            if (!hasError) {
              setHasError(true)
            }
            setIsLoading(false)
          }}
          className={`
            duration-700 ease-in-out
            ${isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'}
          `}
        />
      </picture>
      
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      {/* Format indicator for debugging */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
          {hasError ? 'JPEG' : 'AVIF/WebP'}
        </div>
      )}
    </div>
  )
}

// Utility function to generate optimized image URLs
export function getOptimizedImageUrl(src: string, format: 'avif' | 'webp' | 'jpeg' = 'webp', width?: number) {
  const baseName = src.replace(/\.[^/.]+$/, '')
  const formatExt = format === 'jpeg' ? '-optimized.jpg' : `.${format}`
  const sizeParam = width ? `?w=${width}` : ''
  
  return `${baseName}${formatExt}${sizeParam}`
}
