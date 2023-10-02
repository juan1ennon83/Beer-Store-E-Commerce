import React, { useState, useEffect } from 'react';

const Banner = () => {  

  const slides = [
    'https://res.cloudinary.com/dm9glx5a7/image/upload/v1696265823/beerStore/advertencia_v66mci.png',
    'https://res.cloudinary.com/dm9glx5a7/image/upload/v1696265823/beerStore/p1_utwm7x.png',
    'https://res.cloudinary.com/dm9glx5a7/image/upload/v1696265823/beerStore/p2_u3lheg.png',
    'https://res.cloudinary.com/dm9glx5a7/image/upload/v1696265823/beerStore/p3_sgmndc.png'
  ]
  //console.log(banner);
  // console.log(slides);

  const [currentIndex, setCurrentIndex] = useState(0);

 
  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(newIndex);
  };

  
  useEffect(() => {
    if (slides.length > 0) {
      const interval = setInterval(nextSlide, 5000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [currentIndex, slides]);

  if (slides.length === 0) {
    
    return <div>No hay banners disponibles.</div>;
  }

   return (
    <div className='max-w h-[780px] w-full relative group bg-black block'>
      
      <div style={{ backgroundImage: `url(${slides[currentIndex]})` }} className='w-full h-full duration-500 bg-center bg-cover'></div>

      
      {/* <div className="absolute inset-x-[15%] bottom-1/2 hidden py-5 text-center md:block top-1/2 transform -translate-y-1/2 text-black" >
        <h5 className="text-6xl font-normal tracking-widest text-center leading-2">Estilo y Distinción</h5>
        <p className="text-4xl font-normal tracking-widest text-center py-7 ">
          Hotel PF 
        </p>
      </div> */}

      
    </div>
  );
};

export default Banner;