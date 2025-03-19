import {getDetalles} from '@/components/dgt/infocarApi';
import {SensorMeteorologico, sensorMeteorologicoLabels} from "@/components/dgt/types/BuscarElementos";

interface SensorMeteorologicoProps {
  codEle: string;
}

export const SensorMeteorologicoComponent = async ({codEle}: SensorMeteorologicoProps) => {
  const data = await getDetalles(codEle, 'SensorMeteorologico') as SensorMeteorologico;

  if (data.noDatos) {
    return <div>No hay datos</div>;
  }

  const filteredData = Object.entries(data)
    .filter(([key, value]) => value !== '--' && sensorMeteorologicoLabels[key]);

  return (
    <div className={"text-left"}>
      {filteredData.map(([key, value]) => (
        <p key={key}><strong>{sensorMeteorologicoLabels[key]}:</strong> {value}</p>
      ))}
    </div>
  );
};