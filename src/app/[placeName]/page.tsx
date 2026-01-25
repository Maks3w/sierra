import WebcamCard from '@/components/WebcamCard';
import InfonieveWidget from '@/components/InfonieveWidget';
import places from '@/config/placesConfig';
import Link from "next/link";
import Image from "next/image";
import AemetWidget from "@/components/AemetWidget";
import {notFound} from "next/navigation";
import StopTimes from "@/components/crtm/StopTimes";
import {Suspense} from "react";
import Section from "@/components/Section";

export default async function Home({params}: {
  params: Promise<{ placeName: string }>
}) {
  const {placeName: _placeName} = await params
  const placeName = decodeURIComponent(_placeName)

  const selectedPlace = places.find(p => p.name === placeName);
  if (!selectedPlace) {
    notFound()
  }

  return (
    <div>
      <Section>
        {selectedPlace.webcams.map((webcam, index) => (
          <Link
            key={webcam.name}
            href={`/carousel?place=${selectedPlace.name}&index=${index}`}>
            <WebcamCard webcam={webcam}/>
          </Link>
        ))}
      </Section>
      <hr className="my-6"/>
      <Section>
        {selectedPlace.infoNieve && (
          <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <h2 className="text-lg font-semibold p-4 bg-gray-700 text-white">Estación de esquí</h2>
            <div className="aspect-w-16 aspect-h-9 relative text-center">
              <InfonieveWidget estacion={selectedPlace.infoNieve}/>
            </div>
          </div>
        )}
        {selectedPlace.socialNetwork.twitter && (
          <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <h2 className="text-lg font-semibold p-4 bg-gray-700 text-white">Redes Sociales</h2>
            <div className="aspect-w-16 aspect-h-9 relative text-center">
              <a className="twitter-timeline" data-dnt="true" data-theme="dark" href={`https://x.com/${selectedPlace.socialNetwork.twitter}`}>Tweets by {selectedPlace.socialNetwork.twitter}</a> <script async src="https://platform.x.com/widgets.js" charSet="utf-8"></script>
            </div>
          </div>
        )}
      </Section>
      <hr className="my-6"/>
      <Section>
        {selectedPlace.weather.map((weather) => (
          <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden" key={weather.type}>
            <h2 className="text-lg font-semibold p-4 bg-gray-700 text-white">{weather.type}</h2>
            <div className="aspect-w-16 aspect-h-9 relative text-center bg-white">
              {weather.type === 'Aemet' && (
                <AemetWidget locationId={weather.value}/>
              )}
              {weather.type !== 'Aemet' && (
                <Image src={weather.value} alt={weather.type} width={300} height={200} loading={"lazy"}/>
              )}
            </div>
          </div>
        ))}
      </Section>
      <hr className="my-6"/>
      <Section>
        {selectedPlace.publicTransport.map((transport) => (
          <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden" key={transport.id}>
            <h2 className="text-lg font-semibold p-4 bg-gray-700 text-white">
              {transport.type} - {transport.direction} - Stop: {transport.id}
            </h2>
            <div className="aspect-w-16 aspect-h-9 relative text-left">
              <Suspense fallback={"Loading ..."}>
                <StopTimes stopId={transport.id}/>
              </Suspense>
            </div>
          </div>
        ))}
      </Section>
    </div>
  );
}
