import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Webcam } from '@/config/peaks';

interface WebcamCardProps {
    webcam: Webcam;
    handleClick: (webcam: Webcam, url: string) => void;
}

const WebcamCard = ({ webcam, handleClick }: WebcamCardProps) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState(`${webcam.url}?refresh=true`);

    const handleImageLoad = () => {
        setLoading(false);
        setError(null);
    };

    const handleImageError = () => {
        setLoading(false);
        setError('Failed to load image');
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setLoading(true);
            setImageUrl(`${webcam.url}?${new Date().getTime()}`);
        }, webcam.refreshInterval * 60 * 1000);

        return () => clearInterval(interval);
    }, [webcam]);

    return (
        <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <h2 className="text-lg font-semibold p-4 bg-gray-700 text-white">{webcam.name}</h2>
            <div className="aspect-w-16 aspect-h-9 relative">
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                        <div className="loader"></div>
                    </div>
                )}
                <>
                    <Image
                        src={imageUrl}
                        alt={webcam.name}
                        layout="responsive"
                        width={800}
                        height={600}
                        className="max-w-full h-auto cursor-pointer"
                        loading="lazy"
                        onClick={() => handleClick(webcam, imageUrl)}
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                    />
                    {error && <p className="text-center text-red-500">{error}</p>}
                    <p className="text-center mt-2 text-gray-200">{webcam.providerName} - {webcam.providerImage}</p>
                    <p className="text-center text-sm text-gray-400">Refresh: {webcam.refreshInterval} min, Delay: {webcam.delayTime} min</p>
                </>
            </div>
        </div>
    );
};

export default WebcamCard;