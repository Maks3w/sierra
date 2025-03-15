"use client";

import {useState} from 'react';
import Header from '../components/Header';
import PeakSelector from '../components/PeakSelector';
import WebcamCard from '../components/WebcamCard';
import peaks from '../config/peaksConfig';
import {Peak} from '@/config/peaks';
import Carousel from '../components/Carousel';

export default function Home() {
    const [selectedPeak, setSelectedPeak] = useState<Peak>(peaks[0]);
    const [carouselVisible, setCarouselVisible] = useState(false);
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [imageUrls, setImageUrls] = useState(() => selectedPeak.webcams.map(webcam => webcam.url));

    const onRefreshWebcam = (index: number, newUrl: string) => {
        setImageUrls(imageUrls.map((url, i) => i === index ? newUrl : url));
    };

    const openCarousel = (index: number) => {
        setCarouselIndex(index);
        setCarouselVisible(true);
    };

    const closeCarousel = () => {
        setCarouselVisible(false);
    };

    return (
        <div>
            <Header />
            <main className="min-h-screen p-4 bg-gradient-to-b from-gray-800 to-gray-900">
                <h1 className="text-3xl font-bold text-center mb-6 text-white">Snow Watcher</h1>
                <PeakSelector peaks={peaks} selectedPeak={selectedPeak} setSelectedPeak={setSelectedPeak} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedPeak.webcams.map((webcam, index) => (
                        <WebcamCard
                            key={webcam.name}
                            webcam={webcam}
                            onRefresh={(newUrl) => onRefreshWebcam(index, newUrl)}
                            onClick={() => openCarousel(index)}
                        />
                    ))}
                </div>
            </main>
            {carouselVisible && (
                <Carousel
                    images={selectedPeak.webcams.map(webcam => webcam.url)}
                    initialIndex={carouselIndex}
                    onClose={closeCarousel}
                />
            )}
        </div>
    );
}