import axios from 'axios';
import * as https from "node:https";
import {NextResponse} from "next/server";

export async function GET() {
  const res = await axios.get(`https://puertonavacerrada.com/webcam/WEBcamTeleg.jpg?${new Date().getTime()}`, {
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