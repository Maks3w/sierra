import { useState } from 'react';
import Image from 'next/image';

interface CarouselProps {
    images: string[];
    initialIndex: number;
    onClose: () => void;
}

const Carousel = ({ images, initialIndex, onClose }: CarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    const prevImage = () => {
        setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    };

    const nextImage = () => {
        setCurrentIndex((currentIndex + 1) % images.length);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <button className="absolute left-2 text-2xl z-1" onClick={prevImage}>&lt;</button>
            <div className="relative">
                <Image
                    src={images[currentIndex]}
                    alt={`Image ${currentIndex + 1}`}
                    width={1600}
                    height={1200}
                    className="max-w-full h-auto"
                />
                <button className="absolute top-2 right-2 text-2xl z-1" onClick={onClose}>&times;</button>
            </div>
            <button className="absolute right-2 text-2xl z-1" onClick={nextImage}>&gt;</button>
        </div>
    );
};

export default Carousel;