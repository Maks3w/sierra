import {Suspense} from "react";
import DgtPmv from '@/components/dgt/DgtPmv';
import {getElementos} from "@/components/dgt/infocarApi";
import {ElementoTipo} from "@/components/dgt/types/BuscarElementos";
import WebcamImage from "@/components/WebcamImage";
import Image from "next/image";
import {SensorMeteorologicoComponent} from "@/components/dgt/SensorMeteorologicoComponent";

export default async function PmvPage() {
    const gridClassNames = "grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4";
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
            <div className={gridClassNames}>
                {items.map((item)=> (
                    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden" key={item.codEle}>
                        <h2 className="text-lg font-semibold p-4 bg-gray-700 text-white">
                            { item.tipo } - {item.alias}
                            { item.tipo === ElementoTipo.Incidencia && item.icono &&
                              <Image
                                src={`https://infocar.dgt.es/etraffic/img/iconosIncitar/${item.icono}`}
                                alt={item?.suceso || ""}
                                style={{"display": "inline-block"}}
                              />
                            }
                        </h2>
                        <div className="aspect-w-16 aspect-h-9 relative text-center">
                            { item.tipo === ElementoTipo.SensorMeteorologico && <SensorMeteorologicoComponent codEle={item.codEle}/> }
                            { item.tipo === ElementoTipo.Panel_CMS && <DgtPmv panelId={item.codEle}/> }
                            { item.tipo === ElementoTipo.Camara && <WebcamImage webcam={{
                                name: item.alias,
                                providerName: 'DGT',
                                providerImage: item.alias,
                                refreshInterval: 5,
                                delayTime: 10,
                                url: `https://infocar.dgt.es/etraffic/data/camaras/${item.codEle}.jpg`,
                            }}/> }
                            { item.tipo === ElementoTipo.Incidencia && item.descripcion && <p dangerouslySetInnerHTML={{__html: item.descripcion}} /> }
                        </div>
                    </div>
                ))}
            </div>
        </Suspense>
    );
}
