"use client"

import {Carousel as ResponsiveCarousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './Carousel.module.css';
import Image from 'next/image';
import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import places from "@/config/placesConfig";
import Link from "next/link";

const Carousel = () => {
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

    return (
        <div className={styles.carouselContainer}>
            <Link href="/">
                <button className={styles.closeButton}>Close</button>
            </Link>
            <ResponsiveCarousel selectedItem={initialIndex} showThumbs={false} infiniteLoop useKeyboardArrows>
                {images.map((image, index) => (
                    <div key={index} className={styles.imageContainer}>
                        <Image src={image} alt={`Slide ${index + 1}`}
                               width={800}
                               height={600}
                               className={styles.image} loading="lazy"/>
                    </div>
                ))}
            </ResponsiveCarousel>
        </div>
    );
};

export default Carousel;