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
                name: 'Parada de autobús (HD)',
                providerName: 'Venta Marcelino',
                providerImage: 'Venta Marcelino Oeste',
                refreshInterval: 5,
                delayTime: 0,
                url: 'https://meteocercedilla.com/webcams/webcamoeste.jpg',
            },
            {
                name: 'Helipuerto (HD)',
                providerName: 'Venta Marcelino',
                providerImage: 'Venta Marcelino Sur',
                refreshInterval: 5,
                delayTime: 0,
                url: 'https://meteocercedilla.com/webcams/webcamsur.jpg',
            },
            {
                name: 'Aparcamiento (HD)',
                providerName: 'Venta Marcelino',
                providerImage: 'Venta Marcelino Sureste',
                refreshInterval: 5,
                delayTime: 0,
                url: 'https://meteocercedilla.com/webcams/webcamsureste.jpg',
            },
            {
                name: 'Norte (HD)',
                providerName: 'Venta Marcelino',
                providerImage: 'Venta Marcelino Norte',
                refreshInterval: 5,
                delayTime: 0,
                url: 'https://meteocercedilla.com/webcams/webcamnorte.jpg',
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
        ],
    },
    {
        name: 'Valdesquí',
        webcams: [
            {
                name: 'Aparcamiento (HD)',
                providerName: 'Valdesquí',
                providerImage: 'Aparcamiento',
                refreshInterval: 5,
                delayTime: 0,
                url: 'https://valdesqui.es/~cam/parkingnew.jpg',
            },
            {
                name: 'Pradera (HD)',
                providerName: 'Valdesquí',
                providerImage: 'Valdesquí 1800',
                refreshInterval: 5,
                delayTime: 0,
                url: 'https://valdesqui.es/~cam/cota1800new.jpg',
            },
            {
                name: 'Bola del mundo (HD)',
                providerName: 'Valdesquí',
                providerImage: 'Bola del mundo',
                refreshInterval: 5,
                delayTime: 0,
                url: 'https://valdesqui.es/~cam/bolanew.jpg',
            },
            {
                name: 'Estadio (HD)',
                providerName: 'Valdesquí',
                providerImage: 'Estadio',
                refreshInterval: 5,
                delayTime: 0,
                url: 'https://valdesqui.es/~cam/estadiumnew.jpg',
            }
        ],
    },
];

export default places;