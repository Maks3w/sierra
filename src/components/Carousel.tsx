"use client"

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import styles from './Carousel.module.css';
import {useEffect, useRef, Suspense} from 'react';
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
  // useEffect(() => {
  //   if (screenfull.isEnabled) {
  //     // @ts-expect-error type assertion
  //     // screenfull.request(ref.current);
  //   }
  // }, [ref]);

  var settings = {
    dots: true,
    // lazyLoad: true,
    speed: 500,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: initialIndex,
    adaptiveHeight: true,
  };

  return (
    // <div ref={ref} className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
    <div>
      <Slider {...settings}>
        {webcams.map((webcam, index) => (
          <div key={index}>
            {/*<Suspense fallback={null}>*/}
              <WebcamImage webcam={webcam} />
            {/*</Suspense>*/}
          </div>
        ))}
      </Slider >
    </div>
  );
};

export default Carousel;