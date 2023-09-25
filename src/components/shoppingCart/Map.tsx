'use client';

import { useEffect, useState } from 'react';
import { GoogleMap, Libraries, MarkerF, useLoadScript } from '@react-google-maps/api';
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
  const { clientCoordinate, shopCoordinates, setShopCoordinates } = useShoppingCartContext();
  const { value } = useShoppingCart();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_KEY as string,
    libraries,
  });
  const [centerCoordinate, setCenterCoordinate] = useState<CoordinateType>(() => ({ lat: 50.45466, lng: 30.5238 }));

  useEffect(() => {
    if (value.length > 0 && shopCoordinates?.name !== value.at(0)?.shop.name) {
      const fetch = async () => {
        const data = await getShopInfoByIdService(value.at(0)?.shop._id as string);

        if (data.status === 'failed') return;

        setShopCoordinates(data.data.shop);
      };

      fetch();
    }
    if (value.length === 0) {
      setShopCoordinates(null);
    }
  }, [setShopCoordinates, shopCoordinates?.name, value]);

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

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerClassName={twMerge('', className)}
          zoom={12}
          center={centerCoordinate}
          onClick={handleMapClick}
        >
          {shopCoordinates &&
            shopCoordinates.addresses.map((a) => (
              <MarkerF
                key={a._id}
                position={a.coordinate}
                title={a.name}
                icon={{ url: shopCoordinates.logoUrl, scaledSize: new google.maps.Size(30, 30) }}
                onClick={() => setCenterCoordinate(a.coordinate)}
              />
            ))}
          {clientCoordinate && (
            <MarkerF
              position={clientCoordinate}
              title='Client coordinate'
              icon={{ url: '/images/pin-home.svg', scaledSize: new google.maps.Size(30, 30) }}
              onClick={() => setCenterCoordinate(clientCoordinate)}
            ></MarkerF>
          )}

          {/* {shopCoordinates && clientCoordinate && (
            <PolylineF
              path={[clientCoordinate, centerCoordinate]}
              options={{
                strokeColor: '#ff2527',
                strokeOpacity: 0.75,
                strokeWeight: 2,
                icons: [
                  {
                    offset: '0',
                    repeat: '20px',
                  },
                ],
              }}
            />
          )} */}
        </GoogleMap>
      )}
    </>
  );
}

export default Map;
