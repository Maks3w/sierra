import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Carousel from '@/components/Carousel';
import peaks from '@/config/peaksConfig';

const CarouselPage = () => {
    const router = useRouter();
    const { peak, index } = router.query;
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
            <Header />
            <main>
                <Carousel
                    images={images}
                    initialIndex={initialIndex}
                    onClose={handleClose}
                />
            </main>
        </div>
    );
};

export default CarouselPage;