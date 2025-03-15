import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useDrag } from '@use-gesture/react';

interface CarouselProps {
    images: string[];
    initialIndex: number;
    onClose: () => void;
    autoplayInterval?: number; // Optional prop for autoplay interval in milliseconds
}

const Carousel = ({ images, initialIndex, onClose, autoplayInterval = 3000 }: CarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [transitionClass, setTransitionClass] = useState('carousel-image-enter');
    const [isPlaying, setIsPlaying] = useState(true);

    const prevImage = () => {
        setTransitionClass('carousel-image-exit');
        setTimeout(() => {
            setCurrentIndex((currentIndex - 1 + images.length) % images.length);
            setTransitionClass('carousel-image-enter');
        }, 500);
    };

    const nextImage = () => {
        setTransitionClass('carousel-image-exit');
        setTimeout(() => {
            setCurrentIndex((currentIndex + 1) % images.length);
            setTransitionClass('carousel-image-enter');
        }, 500);
    };

    const bind = useDrag(({ swipe: [swipeX] }) => {
        if (swipeX === -1) nextImage();
        if (swipeX === 1) prevImage();
    });

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowLeft') {
                prevImage();
            } else if (event.key === 'ArrowRight') {
                nextImage();
            } else if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentIndex]);

    useEffect(() => {
        setTransitionClass('carousel-image-enter-active');
    }, [currentIndex]);

    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(nextImage, autoplayInterval);
            return () => clearInterval(interval);
        }
    }, [currentIndex, autoplayInterval, isPlaying]);

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" {...bind()}>
            <button className="absolute left-2 text-2xl z-1" onClick={prevImage}>&lt;</button>
            <div className="relative">
                <Image
                    src={images[currentIndex]}
                    alt={`Image ${currentIndex + 1}`}
                    width={1600}
                    height={1200}
                    className={`max-w-full h-auto ${transitionClass}`}
                />
                <button className="absolute top-2 right-2 text-2xl z-1" onClick={onClose}>&times;</button>
            </div>
            <button className="absolute right-2 text-2xl z-1" onClick={nextImage}>&gt;</button>
            <button className="absolute bottom-2 text-2xl z-1" onClick={togglePlayPause}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
        </div>
    );
};

export default Carousel;