import dynamic from 'next/dynamic'

const AdoptionFlow = dynamic(
  () => import('@/components/adoption-flow/adoption-flow').then(mod => ({ default: mod.AdoptionFlow })),
  {
    loading: () => (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-6 py-16 md:px-12 lg:px-16">
          <div className="mb-6 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-64"></div>
          </div>
          <div className="h-96 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    )
  }
)

export default function AdoptPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <AdoptionFlow />
    </div>
  )
}
