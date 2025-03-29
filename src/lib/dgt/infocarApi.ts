import {
  BuscarElementosParams,
  paramsDefaults, Elemento
} from "@/lib/dgt/types/BuscarElementos";

const TIMEOUT = 9000;
const CACHE_TTL = 60;

export const buildBuscarElementosUrl = (params: BuscarElementosParams): string => {
  const baseUrl = 'https://infocar.dgt.es/etraffic/BuscarElementos';
  const queryParams = new URLSearchParams();
  const allParams = {...paramsDefaults, ...params};

  for (const [key, value] of Object.entries(allParams)) {
    queryParams.append(key, value.toString());
  }

  return `${baseUrl}?${queryParams.toString()}`;
}

export const getElementos = async (params: BuscarElementosParams): Promise<Elemento[]> => {
  const url = buildBuscarElementosUrl(params);
  const response = await dgtFetch(url);
  return response.json();
}

export const getDetalles = async (codEle: string, tipo: string): Promise<unknown> => {
  const response = await dgtFetch(`https://infocar.dgt.es/etraffic/BuscarElementos?accion=getDetalles&codEle=${codEle}&tipo=${tipo}&indiceMapa=0`);
  return await response.json();
}

const dgtFetch = async (url: string) => {
  return await fetch(url, {
    next: {revalidate: CACHE_TTL},
    signal: AbortSignal.timeout(TIMEOUT)
  });
}
