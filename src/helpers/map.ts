import { CoordinateType } from '@/types';

export const getAddressByLocation = async (location: CoordinateType) => {
  const geocoder = new window.google.maps.Geocoder();
  let address = null;

  await geocoder.geocode({ location }, (results, status) => {
    console.log('Converted coordinate', results, status);
  });

  return address;
};

export const getLocationByAddress = async (address: string) => {
  const geocoder = new window.google.maps.Geocoder();
  let location = null;

  try {
    await geocoder.geocode({ address }, async (results, status) => {
      if (status === 'OK' && results && results?.length > 0) {
        location = {
          lat: results?.at(0)?.geometry.location.lat()!,
          lng: results?.at(0)?.geometry.location.lng()!,
        };
      } else {
        location = null;
      }
    });
  } catch (err) {
    //console.log((err as Error).message);
  }

  return location;
};
