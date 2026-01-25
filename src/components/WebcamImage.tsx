"use client"

import Image from 'next/image';
import {useCallback, useEffect, useState} from 'react';
import {Webcam} from "@/types/Places";

interface WebcamImageProps {
  webcam: Webcam,
  className?: string,
}

const generateFreshUrl = (webcam: Webcam) => {
  return `${webcam.url}?${new Date().getTime()}`;
}

const WebcamImage = ({webcam, className}: WebcamImageProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState(generateFreshUrl(webcam));
  const refreshInterval = webcam.refreshInterval;

  const refreshHandler = useCallback(() => {
    setLoading(true);
    setImageUrl(generateFreshUrl(webcam));
  }, [webcam]);

  const handleImageLoad = () => {
    setLoading(false);
    setError(null);
  };

  const handleImageError = () => {
    setLoading(false);
    setError('Failed to load image');
  };

  useEffect(() => {
    const interval = setInterval(refreshHandler, refreshInterval * 60 * 1000);
    return () => clearInterval(interval);
  }, [refreshHandler, refreshInterval]);

  return (
    <div data-testid="webcam-image">
      {loading && (
        <div data-testid="webcam_image-loader"
             className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="loader"></div>
        </div>
      )}
      <>
        <Image
          src={imageUrl}
          alt={`${webcam.providerName} - ${webcam.providerImage}`}
          width={800}
          height={600}
          className={className}
          loading="lazy"
          onLoad={handleImageLoad}
          onError={handleImageError}
          unoptimized
        />
        {error && <p className="text-center text-red-500">{error}</p>}
      </>
    </div>
  );
};

export default WebcamImage;