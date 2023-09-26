'use client';

import { useCallback, useEffect, useState } from 'react';
import { GoogleMap, Libraries, MarkerF, useLoadScript } from '@react-google-maps/api';
import { twMerge } from 'tailwind-merge';
import type { CoordinateType } from '@/types';
import { getShopInfoByIdService } from '@/services/api';
import { useShoppingCartContext } from '.';
import { useShoppingCart } from '@/hooks';
import { getAddressByLocation } from '@/helpers';
import MapDirectionRenderer from './MapDirectionRenderer';

const libraries: Libraries = ['places'];
type Props = {
  className?: string;
};

function Map({ className }: Props) {
  const { client, shop, selectedShopCoordinate, setShop, setClient, setSelectedShopCoordinate } =
    useShoppingCartContext();
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

        const shop = data.data.shop;

        setShop(shop);
      };

      fetch();
    }
    if (value.length === 0) {
      setShop(null);
      setSelectedShopCoordinate(null);
    }
  }, [setSelectedShopCoordinate, setShop, shop?.name, value]);

  const handleMapClick = useCallback(
    async (event: google.maps.MapMouseEvent) => {
      if (!event.latLng) return;

      const newMarker = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };

      const address = await getAddressByLocation(newMarker);

      setClient({
        name: address as string,
        coordinate: newMarker,
      });
    },
    [setClient]
  );

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
                onClick={() => {
                  setCenterCoordinate(a.coordinate);
                  setSelectedShopCoordinate(a.coordinate);
                }}
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

          {shop && client?.coordinate && selectedShopCoordinate && (
            <MapDirectionRenderer destination={client.coordinate} origin={selectedShopCoordinate} />
          )}
        </GoogleMap>
      )}
    </>
  );
}

export default Map;
