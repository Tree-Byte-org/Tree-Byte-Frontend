import dynamic from 'next/dynamic'

export const LazyAdoptionFlow = dynamic(
  () => import('@/components/adoption-flow/adoption-flow'),
  { 
    loading: () => (
      <div className="flex flex-col space-y-4 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
        <div className="h-12 bg-gray-200 rounded w-1/2"></div>
      </div>
    )
  }
)
