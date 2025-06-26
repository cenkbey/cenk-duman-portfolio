import Image from "next/image"

export default function EmeraldNecklaceHero() {
  return (
    <section className="w-full flex flex-col items-center justify-center py-10 px-4 md:px-8">
      <div className="w-full max-w-5xl relative aspect-video rounded-2xl overflow-hidden shadow-xl group">
        <Image
          src="/images/emerald-necklace-specs.jpg" // Mevcut görselinizi kullanıyorum
          alt="Emerald Cut Necklace"
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
          priority
        />
      </div>
      <p className="mt-6 text-xl md:text-2xl font-light text-center text-neutral-700">
        Emerald Cut Elegance – Custom Designed
      </p>
    </section>
  )
}
