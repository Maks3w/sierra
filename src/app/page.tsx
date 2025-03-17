"use client";

import {useState} from 'react';
import PlaceSelector from '../components/PlaceSelector';
import WebcamCard from '../components/WebcamCard';
import places from '../config/placesConfig';
import {Place} from '@/config/places';
import Link from "next/link";

export default function Home() {
  const [selectedPlace, setSelectedPlace] = useState<Place>(places[0]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6 text-white">Snow Watcher</h1>
      <PlaceSelector places={places} selectedPlace={selectedPlace} setSelectedPlace={setSelectedPlace}/>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {selectedPlace.webcams.map((webcam, index) => (
          <Link
            key={webcam.name}
            href={`/carousel?place=${selectedPlace.name}&index=${index}`}>
            <WebcamCard webcam={webcam}/>
          </Link>
        ))}
      </div>
    </div>
  );
}