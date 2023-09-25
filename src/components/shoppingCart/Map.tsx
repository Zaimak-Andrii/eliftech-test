'use client';

import { useCallback, useEffect, useState } from 'react';
import { GoogleMap, Libraries, MarkerF, useLoadScript, DirectionsRenderer } from '@react-google-maps/api';
import type { CoordinateType } from '@/types';
import { getShopInfoByIdService } from '@/services/api';
import { useShoppingCartContext } from '.';
import { useShoppingCart } from '@/hooks';
import { twMerge } from 'tailwind-merge';

const libraries: Libraries = ['places'];
type Props = {
  className?: string;
};

function Map({ className }: Props) {
  const { client, shop, setShop } = useShoppingCartContext();
  const { value } = useShoppingCart();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_KEY as string,
    libraries,
  });
  const [centerCoordinate, setCenterCoordinate] = useState<CoordinateType>(() => ({ lat: 50.45466, lng: 30.5238 }));

  useEffect(() => {
    if (value.length > 0 && shop?.name !== value.at(0)?.shop.name) {
      const fetch = async () => {
        const data = await getShopInfoByIdService(value.at(0)?.shop._id as string);

        if (data.status === 'failed') return;

        setShop(data.data.shop);
      };

      fetch();
    }
    if (value.length === 0) {
      setShop(null);
    }
  }, [setShop, shop?.name, value]);

  const handleMapClick = async (event: google.maps.MapMouseEvent) => {
    if (!event.latLng) return;

    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    const geocoder = new window.google.maps.Geocoder();

    await geocoder.geocode({ location: newMarker }, (results, status) => {
      console.log('Converted coordinate', results, status);
    });
  };

  const [response, setResponse] = useState<google.maps.DirectionsResult | null>(null);

  const directionsCallback = useCallback((result: any) => {
    if (result !== null) {
      if (result.status === 'OK') {
        setResponse(result);
        // Extract and set the travel time from the Directions API response
        const duration = result.routes[0].legs[0].duration;
        console.log(duration.text);
      } else {
        console.error('Directions request failed: ', result);
      }
    }
  }, []);

  useEffect(() => {
    const f = async () => {
      if (!window.google || !client?.coordinate || !shop?.addresses) return;

      const directionsService = new window.google.maps.DirectionsService();

      setResponse(null);

      await directionsService.route(
        {
          destination: client?.coordinate!,
          origin: shop?.addresses.at(0)?.coordinate!,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === 'OK' && result) {
            setResponse(result);

            const duration = result.routes[0].legs[0].duration;
            console.log(duration?.text);
          } else {
            console.error('Запрос маршрута завершился неудачей: ', status);
          }
        }
      );
    };

    f();
  }, [client?.coordinate, shop?.addresses]);

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerClassName={twMerge('', className)}
          zoom={12}
          center={centerCoordinate}
          onClick={handleMapClick}
        >
          {shop &&
            shop.addresses.map((a) => (
              <MarkerF
                key={a._id}
                position={a.coordinate}
                title={a.name}
                icon={{ url: shop.logoUrl, scaledSize: new google.maps.Size(30, 30) }}
                onClick={() => setCenterCoordinate(a.coordinate)}
              />
            ))}
          {client && (
            <MarkerF
              position={client.coordinate}
              title='Client coordinate'
              icon={{ url: '/images/pin-home.svg', scaledSize: new google.maps.Size(30, 30) }}
              onClick={() => setCenterCoordinate(client.coordinate)}
            ></MarkerF>
          )}

          {shop && client?.coordinate && (
            <>{response && <DirectionsRenderer directions={response} options={{ markerOptions: { opacity: 0 } }} />}</>
          )}
        </GoogleMap>
      )}
    </>
  );
}

export default Map;
