import {Carousel as ResponsiveCarousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './Carousel.module.css';
import Image from 'next/image';

interface CarouselProps {
    images: string[];
    initialIndex: number;
    onClose: () => void;
}

const Carousel = ({images, initialIndex, onClose}: CarouselProps) => {
    return (
        <div className={styles.carouselContainer}>
            <button onClick={onClose} className={styles.closeButton}>Close</button>
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