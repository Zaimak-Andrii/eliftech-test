import { CoordinateType } from '@/types';
import { DirectionsRenderer, type DirectionsRendererProps } from '@react-google-maps/api';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type Props = {
  destination: CoordinateType | null;
  origin: CoordinateType | null;
};

function MapDirectionRenderer({ destination, origin }: Props) {
  const [response, setResponse] = useState<google.maps.DirectionsResult | null>(null);

  const callDirectionService = useCallback(async () => {
    const directionsService = new window.google.maps.DirectionsService();

    await directionsService.route(
      {
        destination: destination!,
        origin: origin!,
        travelMode: google.maps.TravelMode.DRIVING,
        language: 'en',
      },
      (result, status) => {
        if (status === 'OK' && result) {
          setResponse(result);

          const duration = result.routes[0].legs[0].duration;
          if (duration) toast.success(`Approximate delivery time is ${duration?.text}`);
        } else {
          console.error('Запрос маршрута завершился неудачей: ', status);
        }
      }
    );
  }, [destination, origin]);

  useEffect(() => {
    if (!window.google || !destination || !origin) return setResponse(null);

    callDirectionService();
  }, [callDirectionService, destination, origin]);

  return <>{response && <DirectionsRenderer directions={response} options={{ markerOptions: { opacity: 0 } }} />}</>;
}

export default MapDirectionRenderer;
