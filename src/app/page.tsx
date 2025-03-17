"use client";

import {useState} from 'react';
import PlaceSelector from '@/components/PlaceSelector';
import WebcamCard from '@/components/WebcamCard';
import InfonieveWidget from '@/components/InfonieveWidget';
import places from '@/config/placesConfig';
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
            <hr className="my-6"/>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedPlace.infoNieve && (
                    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
                        <h2 className="text-lg font-semibold p-4 bg-gray-700 text-white">Estación de esquí</h2>
                        <div className="aspect-w-16 aspect-h-9 relative text-center">
                            <InfonieveWidget estacion={selectedPlace.infoNieve}/>
                        </div>
                    </div>
                )}
                {selectedPlace.socialNetwork && selectedPlace.socialNetwork.twitter && (
                    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
                        <h2 className="text-lg font-semibold p-4 bg-gray-700 text-white">Redes Sociales</h2>
                        <div className="aspect-w-16 aspect-h-9 relative text-center">
                            <a
                                href={`https://x.com/${selectedPlace.socialNetwork.twitter}`}
                                target="_blank"
                                rel="noopener noreferrer">
                                Ver tweets de {selectedPlace.socialNetwork.twitter} en Twitter
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}