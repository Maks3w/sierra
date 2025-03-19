export interface BuscarElementosParams {
  latNS: number;
  longNS: number;
  latSW: number;
  longSW: number;
  zoom?: number;
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
  encodedPoints?: string;
  encodedLevels?: string;
  textoAdvertenciaPrecision?: string;
  indiceMapa?: string;
}

export enum ElementoTipo {
  SensorMeteorologico = 'SensorMeteorologico',
  Panel_CMS = 'Panel_CMS',
  Camara = 'Camara',
  Incidencia = 'Incidencia',
  NivelServicio = 'nivelServicio',
  Radar = 'Radar',
  SensorTrafico = 'SensorTrafico'
}

export const paramsDefaults = {
  zoom: 18,
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

export interface Panel_CMS {
  mensaje2: string;
  mensaje1: string;
  imgTxtIzq1: string;
  imgTxtIzq2: string;
  textoAdvertenciaPrecision: string;
  indiceMapa: string;
  drawDer2: string;
  drawIz2: string;
  tipo: string;
  drawDer1: string;
  drawIz1: string;
  imgTxtDer2: string;
  imgTxtDer1: string;
  NumAlternancias: string;
}

export interface SensorMeteorologico {
  t_congel: string;
  tipo: string;
  vel_viento: string;
  dir_viento: string;
  est_super: string;
  t_subsuelo: string;
  textoAdvertenciaPrecision: string;
  tip_viento: string;
  alt_agua: string;
  t_super: string;
  tiempo_Presente: string;
  visibilidad: string;
  radiacion_global: string;
  fecha: string;
  tipo_viento: string;
  temp_rocio: string;
  c_Precipitaciones: string;
  i_Precipitaciones: string;
  temperatura: string;
  humedad: string;
  n_Precipitacion: string;
  salinidad: string;
  presion_A: string;
  indiceMapa: string;
  noDatos?: string;
}

export const sensorMeteorologicoLabels: { [key: string]: string } = {
  fecha: "Fecha",
  t_congel: "Temperatura de Congelación",
  vel_viento: "Velocidad del Viento",
  dir_viento: "Dirección del Viento",
  est_super: "Estado de la Superficie",
  t_subsuelo: "Temperatura del Subsuelo",
  tip_viento: "Tipo de Viento",
  alt_agua: "Altura del Agua",
  t_super: "Temperatura de la Superficie",
  tiempo_Presente: "Tiempo Presente",
  visibilidad: "Visibilidad",
  radiacion_global: "Radiación Global",
  tipo_viento: "Tipo de Viento",
  temp_rocio: "Temperatura del Rocío",
  c_Precipitaciones: "Precipitaciones",
  i_Precipitaciones: "Intensidad de Precipitaciones",
  temperatura: "Temperatura",
  humedad: "Humedad",
  n_Precipitacion: "Nivel de Precipitación",
  salinidad: "Salinidad",
  presion_A: "Presión Atmosférica",
};

export interface SensorTrafico {
  fecha: string;
  tipo: string;
  textoAdvertenciaPrecision: string;
  intensidad: string;
  ocupacion: string;
  composicion: string;
  velocidad: string;
  indiceMapa: string;
  noDatos: string;
}

export interface Incidencia {
  icono: string;
  descripcion: string;
  tipo: string;
  estado: number;
  autonomia: string;
  lng: number;
  causa: string;
  hora: string;
  precision: string;
  pkFinal: number;
  provincia: string;
  fechaFin: string;
  horaFin: string;
  fecha: string;
  pkIni: number;
  sentido: string;
  alias: string;
  carretera: string;
  poblacion: string;
  suceso: string;
  codEle: string;
  nivel: string;
  lat: number;
}
