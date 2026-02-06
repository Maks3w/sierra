import axios from 'axios';
import {NextRequest, NextResponse} from "next/server";
import { placesWithInfoNieve } from '@/config/placesConfig';

// Extract valid estacion codes from placesConfig
const validEstaciones = placesWithInfoNieve
  .map(place => place.infoNieve!.toString());

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const estacion = searchParams.get('estacion');

  if (!estacion) {
    return new NextResponse('Missing estacion parameter', { status: 400 });
  }

  if (!validEstaciones.includes(estacion)) {
    return new NextResponse(`Invalid estacion code`, { status: 400 });
  }

  const res = await axios.get(`https://www.infonieve.es/widgets/estado-estacion.php?width=299&estacion=${estacion}&bgcolor=D2D2D2&txtcolor=000000&target=top`, {
    responseType: 'arraybuffer',
  });
  return new NextResponse(res.data, {
    status: res.status,
    headers: {
      'Content-Type': res.headers['content-type'],
    },
  });
}
