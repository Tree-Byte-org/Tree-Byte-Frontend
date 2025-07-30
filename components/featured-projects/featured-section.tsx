"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  {
    src: "/featured-projects/1.jpg",
    alt: "Cascada en el bosque tropical",
    title: "Finca El Durango",
  },
  {
    src: "/featured-projects/2.jpg",
    alt: "Guacamayas en tronco de árbol",
    title: "Finca El Durango",
  },
  {
    src: "/featured-projects/3.jpg",
    alt: "Felino salvaje en rama de árbol",
    title: "Finca El Durango",
  },
  {
    src: "/featured-projects/4.jpg",
    alt: "Cielo nocturno estrellado a través de árboles",
    title: "Finca El Durango",
  },
  {
    src: "/featured-projects/5.jpg",
    alt: "Luz solar filtrándose entre hojas verdes",
    title: "Finca El Durango",
  },
];

export default function FeaturedSection() {
  return (
    <section className="relative bg-cover bg-center bg-no-repeat text-white py-24">
      <div className="container mx-auto px-6">
        {/* Texto superior */}
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8 mb-16">
          {/* Título */}
          <h1 className="text-6xl md:text-7xl font-bold leading-tight text-white md:max-w-sm">
            FIND THE <br />
            PERFECT <br />
            PROJECT
          </h1>

          {/* Descripción + botón */}
          <div className="flex flex-col justify-center md:items-start text-white/90 text-base max-w-xl">
            <p className="mb-6 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo.
            </p>
            <button className="bg-[#7EF45D] hover:bg-green-600 text-black font-semibold px-8 py-4 rounded-full text-lg transition-colors">
              Explore all projects
            </button>
          </div>
        </div>

        {/* Carrusel */}
        <div className="w-full max-w-6xl mx-auto">
          <div className="flex gap-4 overflow-hidden">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative flex-shrink-0 w-64 h-80 rounded-lg overflow-hidden"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 256px"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white text-sm font-medium">
                    {image.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Botones navegación */}
          <div className="flex justify-start mt-6 ml-2 gap-6">
            <button className="w-12 h-12 border-2 border-[#7EF45D] hover:bg-green-600 rounded-full flex items-center justify-center text-[#7EF45D] hover:text-white transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button className="w-12 h-12 border-2 border-[#7EF45D] hover:bg-green-600 rounded-full flex items-center justify-center text-[#7EF45D] hover:text-white transition-colors">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Bloque final de suscripción */}
        <div className="w-full max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <p className="text-white/90 text-base max-w-md leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco.
          </p>

          <div className="md:justify-self-end">
            <p className="font-semibold text-white mb-4">
              Do not miss new listings and updates about our projects
            </p>
            <button className="bg-[#7EF45D] hover:bg-green-600 text-black font-semibold px-6 py-3 rounded-full text-base transition-colors">
              Subscribe here
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
