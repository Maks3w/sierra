'use client'

import Carousel from '@/components/Carousel';
import {Suspense} from "react";
import {useSearchParams} from "next/navigation";
import places from '@/config/placesConfig';

const CarouselPage = () => {
  const searchParams = useSearchParams();
  const place = searchParams.get('place');
  const index = searchParams.get('index');
  const selectedPlace = places.find(p => p.name === place);
  if (!selectedPlace) {
    return <p>Place not found</p>;
  }
  const webcams = selectedPlace.webcams;
  const initialIndex = Number(index);

  const onClose = () => {
    window.location.href = `/${place}`;
  }

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Carousel
          webcams={webcams}
          initialIndex={initialIndex}
          onClose={onClose}
        />
      </Suspense>
    </div>
  );
};

export default CarouselPage;