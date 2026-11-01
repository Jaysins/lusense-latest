import Image from "next/image";

const Features = () => {
  return (
    <div className="py-12 md:py-20 px-10 md:px-20 bg-linear-to-r from-white to-[#eeeeff] top-0 bottom-0">
      {/* header text  */}
      <div className="text center flex flex-col justify-center items-center">
        <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
          Experience the magic
        </h2>
        <p className="text-base md:text-xl text-center">
          From a single glance to your front door. LuSense bridges the gap
          between seeing and owning.
        </p>
      </div>

      <div className="hidden md:flex justify-center items-center mt-10 w-full">
        <div className="relative w-full max-w-7xl h-175">
          <Image
            alt="features image"
            src="/features-desktop.png"
            fill
            className="object-contain rounded-2xl"
            priority
          />
        </div>
      </div>
      
       <div className="md:hidden w-full flex justify-center mt-5">
        {/* Remove fixed h-225, use h-auto and let aspect ratio control it */}
        <div className="relative w-full max-w-sm h-auto aspect-2/5">
          s
          <Image
            alt="features image"
            src="/features-mobile.png"
            fill
            className="object-cover rounded-2xl" /* Changed to object-cover to fill the box properly */
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Features;
