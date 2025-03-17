"use client"

import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './Carousel.module.css';
import { useSearchParams } from 'next/navigation';
import {useEffect, useRef, useState} from 'react';
import places from '@/config/placesConfig';
import Link from 'next/link';
import WebcamImage from './WebcamImage';
import {Webcam} from "@/types/Places";
import screenfull from 'screenfull';


const Carousel = () => {
    const searchParams = useSearchParams();
    const place = searchParams.get('place');
    const index = searchParams.get('index');
    const [initialIndex, setInitialIndex] = useState(0);
    const [webcams, setWebcams] = useState<Webcam[]>([]);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (place && index !== undefined) {
            const selectedPlace = places.find(p => p.name === place);
            if (selectedPlace) {
                setInitialIndex(Number(index));
                setWebcams(selectedPlace.webcams);
            }
        }
    }, [place, index]);

    useEffect(() => {
        if (screenfull.isEnabled) {
            // @ts-expect-error type assertion
            screenfull.request(ref.current);
        }
    }, []);

    return (
        <div className={styles.carouselContainer} ref={ref}>
            <Link href="/">
                <button className={styles.closeButton}>Close</button>
            </Link>
            <ResponsiveCarousel selectedItem={initialIndex} showThumbs={false} infiniteLoop useKeyboardArrows>
                {webcams.map((webcam, index) => (
                    <div key={index} className={styles.imageContainer}>
                        <WebcamImage webcam={webcam} className={styles.image} key={index} />
                    </div>
                ))}
            </ResponsiveCarousel>
        </div>
    );
};

export default Carousel;