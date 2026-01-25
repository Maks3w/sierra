import { describe, it, expect } from 'vitest';
import {buildBuscarElementosUrl} from "@/lib/dgt/infocarApi";

describe('BuscarElementos API', () => {
  it('should build the correct URL with all parameters', () => {
    const params = {
      latNS: 40.9,
      longNS: -3.8,
      latSW: 40.7,
      longSW: -4.1,
      zoom: 13,
      accion: 'getElementos',
      Camaras: true,
      SensoresTrafico: true,
      SensoresMeteorologico: true,
      Paneles: true,
      Radares: true,
      IncidenciasRETENCION: true,
      IncidenciasOBRAS: true,
      IncidenciasMETEOROLOGICA: true,
      IncidenciasPUERTOS: true,
      IncidenciasOTROS: true,
      IncidenciasEVENTOS: true,
      IncidenciasRESTRICCIONES: true,
      niveles: true,
      caracter: 'acontecimiento'
    };

    const expectedUrl = 'https://infocar.dgt.es/etraffic/BuscarElementos?zoom=13&accion=getElementos&Camaras=true&SensoresTrafico=true&SensoresMeteorologico=true&Paneles=true&Radares=true&IncidenciasRETENCION=true&IncidenciasOBRAS=true&IncidenciasMETEOROLOGICA=true&IncidenciasPUERTOS=true&IncidenciasOTROS=true&IncidenciasEVENTOS=true&IncidenciasRESTRICCIONES=true&niveles=true&caracter=acontecimiento&latNS=40.9&longNS=-3.8&latSW=40.7&longSW=-4.1';

    const url = buildBuscarElementosUrl(params);
    expect(url).toBe(expectedUrl);
  });

  it('should build the correct URL with only required parameters', () => {
    const params = {
      latNS: 40.9,
      longNS: -3.8,
      latSW: 40.7,
      longSW: -4.1,
      zoom: 13,
    };

    const expectedUrl = 'https://infocar.dgt.es/etraffic/BuscarElementos?zoom=13&accion=getElementos&Camaras=true&SensoresTrafico=true&SensoresMeteorologico=true&Paneles=true&Radares=true&IncidenciasRETENCION=true&IncidenciasOBRAS=true&IncidenciasMETEOROLOGICA=true&IncidenciasPUERTOS=true&IncidenciasOTROS=true&IncidenciasEVENTOS=true&IncidenciasRESTRICCIONES=true&niveles=true&caracter=acontecimiento&latNS=40.9&longNS=-3.8&latSW=40.7&longSW=-4.1';

    const url = buildBuscarElementosUrl(params);
    expect(url).toBe(expectedUrl);
  });
});
