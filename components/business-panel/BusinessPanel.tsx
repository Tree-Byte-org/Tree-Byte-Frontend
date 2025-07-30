import Image from "next/image";
import Link from "next/link";

export const BusinessPanel = () => {
  return (
    <section className="min-h-screen bg-white dark:bg-black">
      <div className="container mx-auto px-4 my-4">
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-bold">Business Panel</h1>

          <div className="flex items-center gap-4">
            <h2 className="font-bold text-3xl">Level:</h2>
            <div className="bg-primary rounded p-4 px-10">
              <p className="text-4xl font-bold">Rooting</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
