import dynamic from 'next/dynamic'

const CouponsPage = dynamic(
  () => import('@/components/coupons/coupons-page'),
  {
    loading: () => (
      <div className="bg-gray-50 dark:bg-black px-6 py-16 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-64"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }
)

export default function CouponsRoute() {
  return <CouponsPage />;
}
