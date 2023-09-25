import React, { InputHTMLAttributes } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type Props<T extends FieldValues> = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: Path<T>;
  error?: string;
  register: UseFormRegister<T>;
};

function FormInput<T extends FieldValues>({ label, name, error, register, ...props }: Props<T>) {
  return (
    <label className='flex flex-col gap-2'>
      {label && <span>{label}</span>}
      <input className='p-1 text-sm' type='text' {...props} {...register(name)} />
      {error && <p className='text-[10px]/[1] text-red-600'>{error}</p>}
    </label>
  );
}

export default FormInput;
