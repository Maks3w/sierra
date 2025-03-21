import WebcamImage from './WebcamImage';
import {Webcam} from '@/types/Places';

interface WebcamCardProps {
  webcam: Webcam;
}

const WebcamCard = ({webcam}: WebcamCardProps) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <h2 className="text-lg font-semibold p-4 bg-gray-700 text-white">{webcam.name}</h2>
      <div className="aspect-w-16 aspect-h-9 relative">
        <WebcamImage
          webcam={webcam}
          className="max-w-full h-auto cursor-pointer"
        />
        <p className="text-center text-sm text-gray-400">Refresh: {webcam.refreshInterval} min,
          Delay: {webcam.delayTime} min</p>
      </div>
    </div>
  );
};

export default WebcamCard;