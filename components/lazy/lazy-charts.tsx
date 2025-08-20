import dynamic from 'next/dynamic'

export const LazyChart = dynamic(
  () => import('@/components/ui/chart'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex aspect-video items-center justify-center bg-gray-100 rounded-lg animate-pulse">
        <div className="h-32 w-32 bg-gray-200 rounded"></div>
      </div>
    )
  }
)
