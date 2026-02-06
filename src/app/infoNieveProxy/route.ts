import axios from 'axios';
import * as https from "node:https";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const estacion = searchParams.get('estacion');

  if (!estacion) {
    return new NextResponse('Missing estacion parameter', { status: 400 });
  }

  const res = await axios.get(`https://www.infonieve.es/widgets/estado-estacion.php?width=299&estacion=${estacion}&bgcolor=D2D2D2&txtcolor=000000&target=top`, {
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
    responseType: 'arraybuffer',
  });
  return new NextResponse(res.data, {
    status: res.status,
    headers: {
      'Content-Type': res.headers['content-type'],
    },
  });
}
