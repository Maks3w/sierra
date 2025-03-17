import {PublicTransportDirection, PublicTransportType} from "@/types/Places";

const places = [
  {
    name: 'Cotos',
    webcams: [
      {
        name: 'Puerto de Cotos',
        providerName: 'DGT',
        providerImage: 'SG-615 PK 6.7 D',
        refreshInterval: 5,
        delayTime: 10,
        url: 'https://infocar.dgt.es/etraffic/data/camaras/161042.jpg',
      },
      {
        name: 'Parada de autobús',
        providerName: 'Venta Marcelino',
        providerImage: 'Venta Marcelino Oeste',
        refreshInterval: 5,
        delayTime: 0,
        url: 'https://meteocercedilla.com/webcams/webcamoeste.jpg',
      },
      {
        name: 'Helipuerto',
        providerName: 'Venta Marcelino',
        providerImage: 'Venta Marcelino Sur',
        refreshInterval: 5,
        delayTime: 0,
        url: 'https://meteocercedilla.com/webcams/webcamsur.jpg',
      },
      {
        name: 'Aparcamiento',
        providerName: 'Venta Marcelino',
        providerImage: 'Venta Marcelino Sureste',
        refreshInterval: 5,
        delayTime: 0,
        url: 'https://meteocercedilla.com/webcams/webcamsureste.jpg',
      },
      {
        name: 'Refugio',
        providerName: 'Venta Marcelino',
        providerImage: 'Venta Marcelino Norte',
        refreshInterval: 5,
        delayTime: 0,
        url: 'https://meteocercedilla.com/webcams/webcamnorte.jpg',
      },
    ],
    socialNetwork: {
      twitter: 'VentaMarcelino',
    },
    publicTransport: [
      {
        id: "8_09196",
        type: PublicTransportType.BUS,
        direction: PublicTransportDirection.UP,
      },
      {
        id: "8_09198",
        type: PublicTransportType.BUS,
        direction: PublicTransportDirection.DOWN,
      },
      {
        id: "5_23",
        type: PublicTransportType.TRAIN,
        direction: PublicTransportDirection.BOTH,
      }
    ],
    weather: [
      {
        type: 'Temperatura',
        value: 'https://www.ventamarcelino.com/meteo/tempdaycomp.png',
      },
      {
        type: 'Velocidad del viento',
        value: 'https://www.ventamarcelino.com/meteo/wspeeddaycomp.png',
      },
      {
        type: 'Precipitaciones',
        value: 'https://www.ventamarcelino.com/meteo/rainday.png',
      },
    ],
  },
  {
    name: 'Navacerrada',
    webcams: [
      {
        name: 'Puerto de Navacerrada',
        providerName: 'DGT',
        providerImage: 'CL-601 PK 24 C',
        refreshInterval: 5,
        delayTime: 10,
        url: 'https://infocar.dgt.es/etraffic/data/camaras/163996.jpg',
      },
      {
        name: 'Pista El Telégrafo',
        providerName: 'SkiNavacerrada',
        providerImage: 'El Telégrafo',
        refreshInterval: 5,
        delayTime: 10,
        url: 'https://puertonavacerrada.com/webcam/WEBcamTeleg.jpg',
      },
      {
        name: 'Fuente de los Geólogos',
        providerName: 'DGT',
        providerImage: 'M-601 PK 18.5 D',
        refreshInterval: 5,
        delayTime: 10,
        url: 'https://infocar.dgt.es/etraffic/data/camaras/161041.jpg',
      },
      {
        name: 'El Ventorillo',
        providerName: 'DGT',
        providerImage: 'M-601 PK 15.6 D',
        refreshInterval: 5,
        delayTime: 10,
        url: 'https://infocar.dgt.es/etraffic/data/camaras/161040.jpg',
      },
      {
        name: 'La Fonda Real',
        providerName: 'DGT',
        providerImage: 'M-601 PK 12.5 C',
        refreshInterval: 5,
        delayTime: 10,
        url: 'https://infocar.dgt.es/etraffic/data/camaras/163994.jpg',
      },
    ],
    socialNetwork: {
      twitter: 'SkiNavacerrada',
    },
    infoNieve: 26,
    publicTransport: [
      {
        id: "8_09195",
        type: PublicTransportType.BUS,
        direction: PublicTransportDirection.UP,
      },
      {
        id: "8_09199",
        type: PublicTransportType.BUS,
        direction: PublicTransportDirection.DOWN,
      },
      {
        id: "5_63",
        type: PublicTransportType.TRAIN,
        direction: PublicTransportDirection.BOTH,
      }
    ],
    weather: [
      {
        type: 'Hotel Corzo',
        value: 'https://meteosierra.com/weewx/puerto/banner.png',
      },
      {
        type: 'Aemet',
        value: 'madrid-id28079',
      },
    ],
  },
  {
    name: 'Valdesquí',
    webcams: [
      {
        name: 'Aparcamiento',
        providerName: 'Valdesquí',
        providerImage: 'Aparcamiento',
        refreshInterval: 5,
        delayTime: 0,
        url: 'https://valdesqui.es/~cam/parkingnew.jpg',
      },
      {
        name: 'Pradera',
        providerName: 'Valdesquí',
        providerImage: 'Valdesquí 1800',
        refreshInterval: 5,
        delayTime: 0,
        url: 'https://valdesqui.es/~cam/cota1800new.jpg',
      },
      {
        name: 'Bola del mundo',
        providerName: 'Valdesquí',
        providerImage: 'Bola del mundo',
        refreshInterval: 5,
        delayTime: 0,
        url: 'https://valdesqui.es/~cam/bolanew.jpg',
      },
      {
        name: 'Estadio',
        providerName: 'Valdesquí',
        providerImage: 'Estadio',
        refreshInterval: 5,
        delayTime: 0,
        url: 'https://valdesqui.es/~cam/estadiumnew.jpg',
      }
    ],
    socialNetwork: {
      twitter: 'ValdesquiCotos',
    },
    infoNieve: 27,
    publicTransport: [
      {
        id: "8_09197",
        type: PublicTransportType.BUS,
        direction: PublicTransportDirection.BOTH,
      }
    ],
    weather: [],
  },
];

const sortedPlaces = [
  places[1],
  places[0],
  places[2],
]

export default sortedPlaces;