import { InputHTMLAttributes, useCallback, useRef } from 'react';
import { FieldValues, Path } from 'react-hook-form';
import ReactGoogleAutocomplete from 'react-google-autocomplete';
import { ClientAddressType } from '@/types';
import { getLocationByAddress } from '@/helpers';

type Props<T extends FieldValues> = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: Path<T>;
  error?: string;
  field: any;
  setValue: (address: ClientAddressType | null) => void;
};

const options = {
  componentRestrictions: { country: 'ua' },
  fields: ['geometry', 'formatted_address'],
  types: ['address'],
};

export default function FormAddressInput<T extends FieldValues>({
  label,
  name,
  error,
  field: { onBlur, value, ...field },
  setValue,
  ...props
}: Props<T>) {
  const ref = useRef<HTMLInputElement | null>(null);
  const placeSelectedHandler = useCallback(
    (place: any) => {
      if (place.geometry?.location) {
        setValue({
          name: place.formatted_address as string,
          coordinate: {
            lat: place.geometry?.location?.lat(),
            lng: place.geometry?.location?.lng(),
          },
        });
      } else {
        setValue(null);
      }
    },
    [setValue]
  );
  const blurHandler = async () => {
    if (!ref.current) return;
    const value = ref.current.value.trim();
    const location = await getLocationByAddress(value);

    setValue(
      location
        ? {
            name: value,
            coordinate: location,
          }
        : null
    );

    onBlur();
  };
  return (
    <label className='flex flex-col gap-2'>
      {label && <span>{label}</span>}
      <ReactGoogleAutocomplete
        className='p-1'
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_KEY}
        onPlaceSelected={placeSelectedHandler}
        options={options}
        inputAutocompleteValue={value}
        onBlur={blurHandler}
        {...props}
        {...field}
        ref={ref}
      />
    </label>
  );
}
