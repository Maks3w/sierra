import {Suspense} from "react";
import DgtPmv from '@/components/dgt/DgtPmv';
import {getElementos} from "@/components/dgt/infocarApi";
import {ElementoTipo} from "@/components/dgt/types/BuscarElementos";
import WebcamImage from "@/components/WebcamImage";
import Image from "next/image";
import {SensorMeteorologicoComponent} from "@/components/dgt/SensorMeteorologicoComponent";
import Section from "@/components/Section";

export default async function PmvPage() {
  const params = {
    latNS: 40.9, // Segovia CL-601
    longNS: -3.7, // Segovia CL-601
    latSW: 40.7,
    longSW: -4.1,
  };
  const carreteras = [
    "CL-601",
    "M-601",
    "SG-615",
    "M-604",
    "M-614",
    "A-6",
    "M-607",
  ]
  const allElements = await getElementos(params);
  const items = allElements.filter((element) => carreteras.includes(element.carretera));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/*Incidencias*/}
      <Section>
        {items.filter((item) => item.tipo === ElementoTipo.Incidencia).map((item) => (
          <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden" key={item.codEle}>
            <h2 className="text-lg font-semibold p-4 bg-gray-700 text-white">
              {item.tipo} - {item.alias} &nbsp;
              {item.icono &&
                <Image
                  src={`https://infocar.dgt.es/etraffic/img/iconosIncitar/${item.icono}`}
                  height={30}
                  width={30}
                  alt={item?.suceso || ""}
                  style={{"display": "inline-block"}}
                />
              }
            </h2>
            <div className="aspect-w-16 aspect-h-9 relative text-center">
              <p dangerouslySetInnerHTML={{__html: item.descripcion || ""}}/>
            </div>
          </div>
        ))}
      </Section>
      <hr className="my-6"/>
      {/*Panel_CMS*/}
      <Section>
        {items.filter((item) => item.tipo === ElementoTipo.Panel_CMS).map((item) => (
          <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden" key={item.codEle}>
            <h2 className="text-lg font-semibold p-4 bg-gray-700 text-white">
              {item.tipo} - {item.alias}
            </h2>
            <div className="aspect-w-16 aspect-h-9 relative text-center">
              <DgtPmv panelId={item.codEle}/>
            </div>
          </div>
        ))}
      </Section>
      <hr className="my-6"/>
      {/*SensorMeteorologico*/}
      <Section>
        {items.filter((item) => item.tipo === ElementoTipo.SensorMeteorologico).map((item) => (
          <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden" key={item.codEle}>
            <h2 className="text-lg font-semibold p-4 bg-gray-700 text-white">
              {item.tipo} - {item.alias}
            </h2>
            <div className="aspect-w-16 aspect-h-9 relative text-center">
              <SensorMeteorologicoComponent codEle={item.codEle}/>
            </div>
          </div>
        ))}
      </Section>
      <hr className="my-6"/>
      {/*Camara*/}
      <Section>
        {items.filter((item) => item.tipo === ElementoTipo.Camara).map((item) => (
          <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden" key={item.codEle}>
            <h2 className="text-lg font-semibold p-4 bg-gray-700 text-white">
              {item.tipo} - {item.alias}
            </h2>
            <div className="aspect-w-16 aspect-h-9 relative text-center">
              <WebcamImage webcam={{
                name: item.alias,
                providerName: 'DGT',
                providerImage: item.alias,
                refreshInterval: 5,
                delayTime: 10,
                url: `https://infocar.dgt.es/etraffic/data/camaras/${item.codEle}.jpg`,
              }}/>
            </div>
          </div>
        ))}
      </Section>
    </Suspense>
  );
}
