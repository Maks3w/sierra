"use client"

import {Carousel as ResponsiveCarousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './Carousel.module.css';
import {useSearchParams} from 'next/navigation';
import {useEffect, useRef} from 'react';
import places from '@/config/placesConfig';
import Link from 'next/link';
import WebcamImage from './WebcamImage';
import screenfull from 'screenfull';


const Carousel = () => {
  const searchParams = useSearchParams();
  const place = searchParams.get('place');
  const index = searchParams.get('index');

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (screenfull.isEnabled) {
      // @ts-expect-error type assertion
      screenfull.request(ref.current);
    }
  }, [ref]);

  const selectedPlace = places.find(p => p.name === place);
  if (!selectedPlace) {
    return <p>Place not found</p>;
  }
  const webcams = selectedPlace.webcams;
  const initialIndex = Number(index);

  return (
    <div className={styles.carouselContainer} ref={ref}>
      <Link href={`/${place}`}>
        <button className={styles.closeButton}>Close</button>
      </Link>
      <ResponsiveCarousel selectedItem={initialIndex} showThumbs={false} infiniteLoop useKeyboardArrows>
        {webcams.map((webcam, index) => (
          <div key={`${place}-${index}`} className={styles.imageContainer}>
            <WebcamImage webcam={webcam} className={styles.image}/>
          </div>
        ))}
      </ResponsiveCarousel>
    </div>
  );
};

export default Carousel;