"use client"

import {Carousel as ResponsiveCarousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './Carousel.module.css';
import {useEffect, useRef} from 'react';
import WebcamImage from './WebcamImage';
import screenfull from 'screenfull';
import {Webcam} from "@/types/Places";

interface Props {
  webcams: Webcam[];
  initialIndex: number;
  onClose: () => void;
}

const Carousel = ({webcams, initialIndex, onClose}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (screenfull.isEnabled) {
      // @ts-expect-error type assertion
      screenfull.request(ref.current);
    }
  }, [ref]);

  return (
    <div ref={ref} className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <ResponsiveCarousel className={styles.carouselContainer} selectedItem={initialIndex} showThumbs={false}
                          showStatus={false} infiniteLoop useKeyboardArrows>
        {webcams.map((webcam, index) => (
          <div key={`${index}`} className={styles.imageContainer}>
            <WebcamImage webcam={webcam} className={styles.image}/>
          </div>
        ))}
      </ResponsiveCarousel>
      <button className="absolute top-2 right-2 text-white text-2xl" onClick={onClose}>&times;</button>
    </div>
  );
};

export default Carousel;