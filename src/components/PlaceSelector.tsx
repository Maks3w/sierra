import { Place } from "@/types/Places";

interface PlaceSelectorProps {
    places: Place[];
    selectedPlace: Place;
    setSelectedPlace: (place: Place) => void;
}

const PlaceSelector = ({ places, selectedPlace, setSelectedPlace }: PlaceSelectorProps) => (
    <div className="flex justify-center mb-4">
        {places.map((place) => (
            <button
                key={place.name}
                className={`mx-2 px-4 py-2 rounded-full ${
                    selectedPlace.name === place.name
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                }`}
                onClick={() => setSelectedPlace(place)}
            >
                {place.name}
            </button>
        ))}
    </div>
);

export default PlaceSelector;