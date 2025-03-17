export interface BuscarElementosParams {
  latNS: number;
  longNS: number;
  latSW: number;
  longSW: number;
  zoom: number;
  accion?: string;
  Camaras?: boolean;
  SensoresTrafico?: boolean;
  SensoresMeteorologico?: boolean;
  Paneles?: boolean;
  Radares?: boolean;
  IncidenciasRETENCION?: boolean;
  IncidenciasOBRAS?: boolean;
  IncidenciasMETEOROLOGICA?: boolean;
  IncidenciasPUERTOS?: boolean;
  IncidenciasOTROS?: boolean;
  IncidenciasEVENTOS?: boolean;
  IncidenciasRESTRICCIONES?: boolean;
  niveles?: boolean;
  caracter?: string;
}

export interface Elemento {
  tipo: ElementoTipo;
  estado: number;
  lng: number;
  sentido: string;
  alias: string;
  carretera: string;
  PK: number;
  codEle: string;
  lat: number;
  descripcion?: string;
  icono?: string;
  autonomia?: string;
  causa?: string;
  hora?: string;
  precision?: string;
  pkFinal?: number;
  provincia?: string;
  fechaFin?: string;
  horaFin?: string;
  fecha?: string;
  pkIni?: number;
  poblacion?: string;
  suceso?: string;
  nivel?: string;
}

export enum ElementoTipo {
  SensorMeteorologico = 'SensorMeteorologico',
  Panel_CMS = 'Panel_CMS',
  Camara = 'Camara',
  Incidencia = 'Incidencia',
}

export const paramsDefaults = {
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
}
