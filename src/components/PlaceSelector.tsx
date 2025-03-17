import places from "@/config/placesConfig";
import Link from "next/link";

interface PlaceSelectorProps {
  selectedPlace: string;
}

export default function PlaceSelector({selectedPlace}: PlaceSelectorProps) {
  return (
    <div className="flex justify-center mb-4">
      {places.map((place) => (
        <Link key={place.name} href={`/${place.name}`}>
          <button
            className={`mx-2 px-4 py-2 rounded-full ${
              selectedPlace === place.name
                ? 'bg-blue-500 text-white'
                : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
            }`}
          >
            {place.name}
          </button>
        </Link>
      ))}
    </div>
  );
}