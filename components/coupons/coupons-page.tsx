import { Search, User, Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

export default function TreeByteCoupons() {
  const coupons = [
    // Column 1 - All use image 1 (Hotel Fumero)
    { id: 1, image: "/coupons/hotel-fumero.jpg", column: 1 },
    { id: 5, image: "/coupons/hotel-fumero.jpg", column: 1 },
    { id: 9, image: "/coupons/hotel-fumero.jpg", column: 1 },
    { id: 13, image: "/coupons/hotel-fumero.jpg", column: 1 },
    { id: 17, image: "/coupons/hotel-fumero.jpg", column: 1 },
    { id: 21, image: "/coupons/hotel-fumero.jpg", column: 1 },

    // Column 2 - All use image 2 (Cabinas Don Samu)
    { id: 2, image: "/coupons/cabinas-don-samu.jpg", column: 2 },
    { id: 6, image: "/coupons/cabinas-don-samu.jpg", column: 2 },
    { id: 10, image: "/coupons/cabinas-don-samu.jpg", column: 2 },
    { id: 14, image: "/coupons/cabinas-don-samu.jpg", column: 2 },
    { id: 18, image: "/coupons/cabinas-don-samu.jpg", column: 2 },
    { id: 22, image: "/coupons/cabinas-don-samu.jpg", column: 2 },

    // Column 3 - All use image 3 (Natura Lodge)
    { id: 3, image: "/coupons/natura-lodge.jpg", column: 3 },
    { id: 7, image: "/coupons/natura-lodge.jpg", column: 3 },
    { id: 11, image: "/coupons/natura-lodge.jpg", column: 3 },
    { id: 15, image: "/coupons/natura-lodge.jpg", column: 3 },
    { id: 19, image: "/coupons/natura-lodge.jpg", column: 3 },
    { id: 23, image: "/coupons/natura-lodge.jpg", column: 3 },

    // Column 4 - All use image 4 (Hotel Chilango)
    { id: 4, image: "/coupons/hotel-chilango.jpg", column: 4 },
    { id: 8, image: "/coupons/hotel-chilango.jpg", column: 4 },
    { id: 12, image: "/coupons/hotel-chilango.jpg", column: 4 },
    { id: 16, image: "/coupons/hotel-chilango.jpg", column: 4 },
    { id: 20, image: "/coupons/hotel-chilango.jpg", column: 4 },
    { id: 24, image: "/coupons/hotel-chilango.jpg", column: 4 },
  ];

  return (
    <div className="min-h-screen ">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-10 py-16">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-16">
          <h1 className="text-3xl font-bold text-gray-900">All Coupons</h1>
          <div className="bg-white border border-gray-300 px-4 py-3 rounded-lg">
            <div className="text-gray-900 text-sm">Redeemable points:</div>
            <div className="text-green-500 text-xl font-bold">1569</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-center space-x-8 mb-16">
          <Select>
            <SelectTrigger className="w-40 bg-white text-gray-900 border border-gray-300 hover:border-gray-400">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="north">North</SelectItem>
              <SelectItem value="south">South</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-40 bg-white text-gray-900 border border-gray-300 hover:border-gray-400">
              <SelectValue placeholder="Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="travel">Travel</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-40 bg-white text-gray-900 border border-gray-300 hover:border-gray-400">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="discount">Discount</SelectItem>
              <SelectItem value="popular">Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Coupons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          {coupons.map((coupon) => (
            <div
              key={coupon.id}
              className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <Image
                  src={coupon.image || "/placeholder.svg"}
                  alt="Coupon"
                  width={300}
                  height={200}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
