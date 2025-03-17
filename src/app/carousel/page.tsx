import Carousel from '@/components/Carousel';
import {Suspense} from "react";

const CarouselPage = () => {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <Carousel/>
            </Suspense>
        </div>
    );
};

export default CarouselPage;