"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '../components/Header';
import PeakSelector from '../components/PeakSelector';
import WebcamCard from '../components/WebcamCard';
import peaks from '../config/peaksConfig';
import { Peak } from '@/config/peaks';

export default function Home() {
    const [selectedPeak, setSelectedPeak] = useState<Peak>(peaks[0]);
    const [modalImage, setModalImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [imageUrls, setImageUrls] = useState(() => selectedPeak.webcams.map(webcam => `${webcam.url}?${new Date().getTime()}`));
    const [error, setError] = useState<string | null>(null);
    const [lastRefreshTime, setLastRefreshTime] = useState<Date | null>(null);
    const [modalLoading, setModalLoading] = useState(false);

    const openModal = (url: string) => {
        setModalImage(url);
        setModalLoading(true);
    };

    const closeModal = () => {
        setModalImage(null);
    };

    const handleImageLoad = () => {
        setLoading(false);
        setError(null);
    };

    const handleImageError = () => {
        setLoading(false);
        setError('Failed to load image');
    };

    useEffect(() => {
        const intervals = selectedPeak.webcams.map((webcam, index) => {
            return setInterval(() => {
                setLoading(true);
                setImageUrls(prevUrls => {
                    const newUrls = [...prevUrls];
                    newUrls[index] = `${webcam.url}?${new Date().getTime()}`;
                    return newUrls;
                });
                setLastRefreshTime(new Date());
            }, webcam.refreshInterval * 60 * 1000);
        });

        return () => intervals.forEach(clearInterval);
    }, [selectedPeak]);

    return (
        <div>
            <Header />
            <main className="min-h-screen p-4 bg-gradient-to-b from-gray-800 to-gray-900">
                <h1 className="text-3xl font-bold text-center mb-6 text-white">Snow Watcher</h1>
                <PeakSelector peaks={peaks} selectedPeak={selectedPeak} setSelectedPeak={setSelectedPeak} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedPeak.webcams.map((webcam, index) => (
                        <WebcamCard
                            key={webcam.name}
                            webcam={webcam}
                            imageUrl={imageUrls[index]}
                            loading={loading}
                            error={error}
                            handleImageLoad={handleImageLoad}
                            handleImageError={handleImageError}
                            openModal={openModal}
                        />
                    ))}
                </div>
                {lastRefreshTime && (
                    <div className="text-center mt-4 text-gray-200">
                        Last refreshed at: {lastRefreshTime.toLocaleTimeString()}
                    </div>
                )}
            </main>
            {modalImage && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeModal}>
                    <div className="relative">
                        {modalLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
                                <div className="loader"></div>
                            </div>
                        )}
                        <Image
                            src={`${modalImage}?${new Date().getTime()}`}
                            alt="Full Size Image"
                            width={1600}
                            height={1200}
                            className="max-w-full h-auto"
                            onLoad={() => setModalLoading(false)}
                            onError={() => setModalLoading(false)}
                        />
                        <button className="absolute top-2 right-2 text-white text-2xl" onClick={closeModal}>&times;</button>
                    </div>
                </div>
            )}
        </div>
    );
}