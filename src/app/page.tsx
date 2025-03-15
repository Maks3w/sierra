"use client";

import { useState } from 'react';
import Image from 'next/image';
import Header from '../components/Header';
import PeakSelector from '../components/PeakSelector';
import WebcamCard from '../components/WebcamCard';
import peaks from '../config/peaksConfig';
import {Peak, Webcam} from '@/config/peaks';

export default function Home() {
    const [selectedPeak, setSelectedPeak] = useState<Peak>(peaks[0]);
    const [modalImage, setModalImage] = useState<string | null>(null);
    const [modalLoading, setModalLoading] = useState(false);

    const openModal = (webcam: Webcam, url: string) => {
        setModalImage(url);
        setModalLoading(true);
    };

    const closeModal = () => {
        setModalImage(null);
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
                            handleClick={openModal}
                        />
                    ))}
                </div>
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
                            src={modalImage}
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