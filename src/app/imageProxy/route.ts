import axios from 'axios';
import {NextRequest, NextResponse} from "next/server";
import { webcamsWithProxy } from '@/config/placesConfig';

const validWebcams = webcamsWithProxy.map(webcam => webcam.url.split('?')[0]);

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json(
      { error: 'URL parameter is required' },
      { status: 400 }
    );
  }

  const urlWithoutTimestamp = url.split('?')[0];
  const isAllowed = validWebcams.some(allowedUrl => urlWithoutTimestamp === allowedUrl);

  if (!isAllowed) {
    return NextResponse.json(
      { error: 'URL not allowed' },
      { status: 403 }
    );
  }

  const res = await axios.get(url, {
    responseType: 'arraybuffer',
  });
  return new NextResponse(res.data, {
    status: res.status,
    headers: {
      'Content-Type': res.headers['content-type'],
    },
  });
}
