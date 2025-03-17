import {Suspense} from "react";
import DgtPmv from '@/components/dgt/DgtPmv';
import {fetchBuscarElementos} from "@/components/dgt/infocarApi";
import {ElementoTipo} from "@/components/dgt/types/BuscarElementos";
import WebcamImage from "@/components/WebcamImage";

export default async function PmvPage() {
    const gridClassNames = "grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4";
    const params = {
        latNS: 40.9,
        longNS: -3.8,
        latSW: 40.7,
        longSW: -4.1,
        zoom: 13,
    };
    const elementos = await fetchBuscarElementos(params);
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className={gridClassNames}>
                {elementos.map((item)=> (
                    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden" key={item.codEle}>
                        <h2 className="text-lg font-semibold p-4 bg-gray-700 text-white">
                            { item.tipo } - {item.alias}
                            { item.tipo === ElementoTipo.Incidencia && <img src={`https://infocar.dgt.es/etraffic/img/iconosIncitar/${item.icono}`} style={{"display": "inline-block"}} /> }
                        </h2>
                        <div className="aspect-w-16 aspect-h-9 relative text-center">
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
