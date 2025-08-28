import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  className?: string
  fallbackSrc?: string
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  fallbackSrc
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Convert JPG/PNG to WebP if available
  const getOptimizedSrc = (originalSrc: string) => {
    if (originalSrc.endsWith('.jpg') || originalSrc.endsWith('.jpeg')) {
      const webpSrc = originalSrc.replace(/\.(jpg|jpeg)$/i, '.webp')
      return webpSrc
    }
    return originalSrc
  }

  const optimizedSrc = getOptimizedSrc(src)
  const displaySrc = hasError && fallbackSrc ? fallbackSrc : optimizedSrc

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={displaySrc}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          if (!hasError && fallbackSrc) {
            setHasError(true)
          }
          setIsLoading(false)
        }}
        className={`
          duration-700 ease-in-out
          ${isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'}
        `}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  )
}
