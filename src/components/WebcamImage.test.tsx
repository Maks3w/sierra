import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import WebcamImage from './WebcamImage';
import { Webcam } from '@/types/Places';

const mockWebcam: Webcam = {
  name: 'Test Webcam',
  url: 'https://example.com/webcam.jpg',
  refreshInterval: 1,
  providerName: 'Test Provider',
  providerImage: 'My image',
  delayTime: 0,
};

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2023-01-01T00:00:00Z'));
});

afterEach(() => {
  vi.useRealTimers();
});

describe('WebcamImage', () => {
  it('shows loading state initially', () => {
    render(<WebcamImage webcam={mockWebcam} />);
    const component = screen.getByTestId("webcam-image");
    expect(component).toMatchSnapshot();
  });

  it('handles image error', async () => {
    render(<WebcamImage webcam={mockWebcam} />);
    const image = screen.getByAltText(`${mockWebcam.providerName} - ${mockWebcam.providerImage}`);

    fireEvent.error(image)
    const component = screen.getByTestId("webcam-image");
    expect(component).toMatchSnapshot();
  });
})
