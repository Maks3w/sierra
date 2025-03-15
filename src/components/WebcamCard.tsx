import Image from 'next/image';

interface WebcamCardProps {
    webcam: {
        name: string;
        providerName: string;
        providerImage: string;
        refreshInterval: number;
        delayTime: number;
        url: string;
    };
    imageUrl: string;
    loading: boolean;
    error: string | null;
    handleImageLoad: () => void;
    handleImageError: () => void;
    openModal: (url: string) => void;
}

const WebcamCard = ({
    webcam,
    imageUrl,
    loading,
    error,
    handleImageLoad,
    handleImageError,
    openModal,
}: WebcamCardProps) => (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <h2 className="text-lg font-semibold p-4 bg-gray-700 text-white">{webcam.name}</h2>
        <div className="aspect-w-16 aspect-h-9 relative">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="loader"></div>
                </div>
            )}
            {webcam.url ? (
                <>
                    <Image
                        src={imageUrl}
                        alt={webcam.name}
                        layout="responsive"
                        width={800}
                        height={600}
                        className="max-w-full h-auto cursor-pointer"
                        loading="lazy"
                        onClick={() => openModal(webcam.url)}
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                    />
                    {error && <p className="text-center text-red-500">{error}</p>}
                    <p className="text-center mt-2 text-gray-200">{webcam.providerName} - {webcam.providerImage}</p>
                    <p className="text-center text-sm text-gray-400">Refresh: {webcam.refreshInterval} min, Delay: {webcam.delayTime} min</p>
                </>
            ) : (
                <div className="flex items-center justify-center h-48 bg-gray-700">
                    <p className="text-gray-200">Webcam Unavailable</p>
                </div>
            )}
        </div>
    </div>
);

export default WebcamCard;