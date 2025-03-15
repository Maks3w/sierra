import { Peak } from "@/config/peaks";

interface PeakSelectorProps {
    peaks: Peak[];
    selectedPeak: Peak;
    setSelectedPeak: (peak: Peak) => void;
}

const PeakSelector = ({ peaks, selectedPeak, setSelectedPeak }: PeakSelectorProps) => (
    <div className="flex justify-center mb-4">
        {peaks.map((peak) => (
            <button
                key={peak.name}
                className={`mx-2 px-4 py-2 rounded-full ${
                    selectedPeak.name === peak.name
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                }`}
                onClick={() => setSelectedPeak(peak)}
            >
                {peak.name}
            </button>
        ))}
    </div>
);

export default PeakSelector;