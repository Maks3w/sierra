import React from 'react';

interface AemetWidgetProps {
  locationId: string;
  width?: string;
  height?: string;
}

const AemetWidget: React.FC<AemetWidgetProps> = ({ locationId, width = '100%', height = '100%' }) => {
  return (
    <div className="card shadow-sm">
      <iframe
        name={`iframe_aemet_${locationId}`}
        width={width}
        height={height}
        src={`https://www.aemet.es/es/eltiempo/prediccion/municipios/mostrarwidget/${locationId}?w=g1p11111010ohmffffffw299z263x4f86d9t95b6e9r0s8n2`}
        frameBorder="0"
        scrolling="no"
        title="AEMET Weather Widget"
      ></iframe>
      <p className="text-center text-sm text-gray-400">AEMET Weather Information</p>
    </div>
  );
};

export default AemetWidget;