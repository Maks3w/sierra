"use client";

import {useState} from 'react';
import PeakSelector from '../components/PeakSelector';
import WebcamCard from '../components/WebcamCard';
import peaks from '../config/peaksConfig';
import {Peak} from '@/config/peaks';
import Link from "next/link";

export default function Home() {
  const [selectedPeak, setSelectedPeak] = useState<Peak>(peaks[0]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6 text-white">Snow Watcher</h1>
      <PeakSelector peaks={peaks} selectedPeak={selectedPeak} setSelectedPeak={setSelectedPeak}/>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {selectedPeak.webcams.map((webcam, index) => (
          <Link
            key={webcam.name}
            href={`/carousel?peak=${selectedPeak.name}&index=${index}`}>
            <WebcamCard webcam={webcam}/>
          </Link>
        ))}
      </div>
    </div>
  );
}