"use client"

import {redirect, useSearchParams} from 'next/navigation';
import Carousel from '@/components/Carousel';
import places from '@/config/placesConfig';
import {useEffect, useState} from "react";

const CarouselPage = () => {
  const searchParams = useSearchParams();
  const place = searchParams.get('place');
  const index = searchParams.get('index');
  const [initialIndex, setInitialIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (place && index !== undefined) {
      const selectedPlace = places.find(p => p.name === place);
      if (selectedPlace) {
        setInitialIndex(Number(index));
        setImages(selectedPlace.webcams.map(webcam => webcam.url));
      }
    }
  }, [place, index]);

  const handleClose = () => {
    redirect('/');
  };

  return (
    <div>
      <Carousel
        images={images}
        initialIndex={initialIndex}
        onClose={handleClose}
      />
    </div>
  );
};

export default CarouselPage;