import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from './route';
import { NextRequest } from 'next/server';

// Mock axios
vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
  },
}));

import axios from 'axios';

describe('imageProxy route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 400 when URL parameter is missing', async () => {
    const request = new NextRequest('http://localhost:3000/imageProxy');
    const response = await GET(request);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json).toEqual({ error: 'URL parameter is required' });
  });

  it('returns 403 when URL is not in the allowed list', async () => {
    const request = new NextRequest('http://localhost:3000/imageProxy?url=https://evil.com/webcam.jpg');
    const response = await GET(request);
    const json = await response.json();

    expect(response.status).toBe(403);
    expect(json).toEqual({ error: 'URL not allowed' });
  });

  it('allows URL from placesConfig with needsProxy=true', async () => {
    // Mock axios response
    const mockImageData = Buffer.from('fake-image-data');
    vi.mocked(axios.get).mockResolvedValue({
      data: mockImageData,
      status: 200,
      headers: {
        'content-type': 'image/jpeg',
      },
    });

    const allowedUrl = 'https://puertonavacerrada.com/webcam/WEBcamTeleg.jpg';
    const request = new NextRequest(`http://localhost:3000/imageProxy?url=${encodeURIComponent(allowedUrl + '?t=123')}`);
    const response = await GET(request);

    expect(response.status).toBe(200);
    expect(vi.mocked(axios.get)).toHaveBeenCalledWith(
      allowedUrl + '?t=123',
      expect.objectContaining({
        responseType: 'arraybuffer',
        headers: {},
      })
    );
  });

  it('passes custom headers when defined in webcam config', async () => {
    // Mock axios response
    const mockImageData = Buffer.from('fake-image-data');
    vi.mocked(axios.get).mockResolvedValue({
      data: mockImageData,
      status: 200,
      headers: {
        'content-type': 'image/jpeg',
      },
    });

    const allowedUrl = 'https://meteosierra.com/cams/puerto/webcam.jpg';
    const request = new NextRequest(`http://localhost:3000/imageProxy?url=${encodeURIComponent(allowedUrl + '?t=123')}`);
    const response = await GET(request);

    expect(response.status).toBe(200);
    expect(vi.mocked(axios.get)).toHaveBeenCalledWith(
      allowedUrl + '?t=123',
      expect.objectContaining({
        responseType: 'arraybuffer',
        headers: {
          'Referer': 'https://meteosierra.com/estaciones/puerto-de-navacerrada/',
        },
      })
    );
  });

  it('strips timestamp when validating URL', async () => {
    // Mock axios response
    const mockImageData = Buffer.from('fake-image-data');
    vi.mocked(axios.get).mockResolvedValue({
      data: mockImageData,
      status: 200,
      headers: {
        'content-type': 'image/jpeg',
      },
    });

    const allowedUrl = 'https://puertonavacerrada.com/webcam/WEBcamTeleg.jpg';
    const urlWithTimestamp = `${allowedUrl}?t=999999999`;
    const request = new NextRequest(`http://localhost:3000/imageProxy?url=${encodeURIComponent(urlWithTimestamp)}`);
    const response = await GET(request);

    expect(response.status).toBe(200);
  });
});
