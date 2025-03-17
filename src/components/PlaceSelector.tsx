import places from "@/config/placesConfig";
import Link from "next/link";

export default async function PlaceSelector() {
  return (
    <div className="flex justify-center mb-4">
      <Link href={`/roads`}>
        <button className={`mx-2 px-4 py-2 rounded-full bg-gray-700 text-gray-200 hover:bg-gray-600`}>
          Carreteras
        </button>
      </Link>
      {places.map((place) => (
        <Link key={place.name} href={`/${place.name}`}>
          <button className={`mx-2 px-4 py-2 rounded-full bg-gray-700 text-gray-200 hover:bg-gray-600`}>
            {place.name}
          </button>
        </Link>
      ))}
    </div>
  );
}