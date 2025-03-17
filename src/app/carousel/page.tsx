"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Carousel from '@/components/Carousel';
import peaks from '@/config/peaksConfig';

const CarouselPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const peak = searchParams.get('peak');
    const index = searchParams.get('index');
    const [initialIndex, setInitialIndex] = useState(0);
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        if (peak && index !== undefined) {
            const selectedPeak = peaks.find(p => p.name === peak);
            if (selectedPeak) {
                setInitialIndex(Number(index));
                setImages(selectedPeak.webcams.map(webcam => webcam.url));
            }
        }
    }, [peak, index]);

    const handleClose = () => {
        router.push('/');
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