import { InputHTMLAttributes, useCallback, useEffect, useRef } from 'react';
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
  const blurHandler = useCallback(async () => {
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
  }, [onBlur, setValue]);

  useEffect(() => {
    if (ref.current) ref.current.value = value;
  }, [value]);

  return (
    <label className='flex flex-col gap-2'>
      {label && <span>{label}</span>}
      <ReactGoogleAutocomplete
        className='p-1'
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_KEY}
        options={options}
        inputAutocompleteValue={value}
        onBlur={blurHandler}
        {...props}
        {...field}
        ref={ref}
      />
      {error && <p className='text-[10px]/[1] text-red-600'>{error}</p>}
    </label>
  );
}
