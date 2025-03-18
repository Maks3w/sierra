import {
  BuscarElementosParams,
  paramsDefaults, Elemento
} from "@/components/dgt/types/BuscarElementos";

export const buildBuscarElementosUrl = (params: BuscarElementosParams): string => {
  const baseUrl = 'https://infocar.dgt.es/etraffic/BuscarElementos';
  const queryParams = new URLSearchParams();
  const allParams = {...paramsDefaults, ...params};

  for (const [key, value] of Object.entries(allParams)) {
    queryParams.append(key, value.toString());
  }

  return `${baseUrl}?${queryParams.toString()}`;
}

export const fetchBuscarElementos = async (params: BuscarElementosParams): Promise<Elemento[]> => {
  const url = buildBuscarElementosUrl(params);
  const response = await fetch(url, {next: {revalidate: 60}});
  return response.json();
}
