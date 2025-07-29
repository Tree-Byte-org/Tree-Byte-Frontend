import Image from "next/image";

export default function CouponsSection() {
  const coupons = [
    {
      name: "Hotel Fumero",
      image: "coupons/hotel-fumero.jpg",
    },
    {
      name: "Cabinas Don Samu",
      image: "coupons/cabinas-don-samu.jpg",
    },
    {
      name: "Natura Lodge",
      image: "coupons/natura-lodge.jpg",
    },
    {
      name: "Hotel Chilango",
      image: "coupons/hotel-chilango.jpg",
    },
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <h3 className="font-semibold text-gray-900 text-sm">
          Coupons Available
        </h3>
        <button className="text-xs text-gray-500 hover:text-gray-700">
          Show all coupons...
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
        {coupons.map((coupon, index) => (
          <div
            key={index}
            className="relative bg-white rounded-sm border border-gray-200 overflow-hidden cursor-pointer hover:shadow-sm transition-shadow"
          >
            <div className="aspect-[2/1] relative">
              <Image
                src={coupon.image || "/placeholder.svg"}
                alt={coupon.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
