import WebcamCard from '@/components/WebcamCard';
import InfonieveWidget from '@/components/InfonieveWidget';
import places from '@/config/placesConfig';
import Link from "next/link";
import AemetWidget from "@/components/AemetWidget";
import {notFound} from "next/navigation";

export default async function Home({params}: {
  params: Promise<{ placeName: string }>
}) {
  const {placeName: _placeName} = await params
  const placeName = decodeURIComponent(_placeName)

  const selectedPlace = places.find(p => p.name === placeName);
  if (!selectedPlace) {
    notFound()
  }

  const gridClassNames = "grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4";

  return (
    <div>
      <div className={gridClassNames}>
        {selectedPlace.webcams.map((webcam, index) => (
          <Link
            key={webcam.name}
            href={`/carousel?place=${selectedPlace.name}&index=${index}`}>
            <WebcamCard webcam={webcam}/>
          </Link>
        ))}
      </div>
      <hr className="my-6"/>
      <div className={gridClassNames}>
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
      <hr className="my-6"/>
      <div className={gridClassNames}>
        {selectedPlace.weather.map((weather) => (
          <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden" key={weather.type}>
            <h2 className="text-lg font-semibold p-4 bg-gray-700 text-white">{weather.type}</h2>
            <div className="aspect-w-16 aspect-h-9 relative text-center bg-white">
              {weather.type === 'Aemet' && (
                <AemetWidget locationId={weather.value}/>
              )}
              {weather.type !== 'Aemet' && (
                <img src={weather.value} alt={weather.type}/>
              )}
            </div>
          </div>
        ))}
      </div>
      <hr className="my-6"/>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {selectedPlace.publicTransport.map((transport) => (
          <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden" key={transport.id}>
            <h2 className="text-lg font-semibold p-4 bg-gray-700 text-white">Transporte público</h2>
            <div className="aspect-w-16 aspect-h-9 relative text-center">
              <iframe src={`https://www.crtm.es/widgets/#/stop/${transport.id}`} width="540"
                      height="660"></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}