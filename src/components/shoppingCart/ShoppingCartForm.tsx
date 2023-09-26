'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'react-toastify';
import { useShoppingCart } from '@/hooks';
import { addOrderService } from '@/services/api';
import { convertNumberToMoney } from '@/helpers';
import ProductsList from './ProductsList';
import { useShoppingCartContext } from '.';
import FormInput from './FormInput';
import FormAddressInput from './FormAddressInput';

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.number().positive().required(),
    address: yup.string().min(3).max(60).required(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const fields: { name: keyof FormData; label: string; placeholder: string; type: HTMLInputElement['type'] }[] = [
  { name: 'name', label: 'Name:', placeholder: 'Enter name', type: 'text' },
  { name: 'email', label: 'Email:', placeholder: 'Enter email', type: 'email' },
  { name: 'phone', label: 'Phone:', placeholder: 'Enter phone', type: 'tel' },
];

function ShoppingCartForm() {
  const { value: shoppintCart, setValue: setShoppingCart } = useShoppingCart();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });
  const captchaRef = useRef<ReCAPTCHA | null>(null);
  const [isCaptchaSuccess, setIsCaptchaSuccess] = useState(false);
  const totalPrice = shoppintCart.reduce((acc, p) => acc + p.count * p.price, 0);
  const isCanSubmit = isValid && isCaptchaSuccess && shoppintCart.length > 0;
  const { client, setClient } = useShoppingCartContext();

  const changeCaptchaHandler = useCallback(() => {
    setIsCaptchaSuccess(true);
  }, []);

  const resetForm = useCallback(() => {
    reset();
    setShoppingCart([]);
    setIsCaptchaSuccess(false);
    setClient(null);
    captchaRef.current?.reset();
  }, [reset, setClient, setShoppingCart]);

  const setAddressValue = useCallback(
    (address: any) => {
      setClient(address);
    },
    [setClient]
  );

  const submitHandler = useCallback(
    async (data: FormData) => {
      const result = await addOrderService({
        ...data,
        products: shoppintCart.map((p) => ({ product: p._id, count: p.count })),
        coupon: null,
      });

      if (result.status === 'failed') {
        return toast.error(result.message);
      }

      resetForm();
      toast.success('Your order accepted success.');
    },
    [resetForm, shoppintCart]
  );

  useEffect(() => {
    setValue('address', client?.name ?? '', { shouldValidate: true, shouldTouch: true });
  }, [client, setValue]);

  return (
    <form className='flex gap-4 flex-col flex-grow w-full ' onSubmit={handleSubmit(submitHandler)}>
      <div className='flex flex-col md:flex-row flex-grow gap-4'>
        <div className='flex-shrink-0 flex flex-col gap-4 flex-grow  p-2 bg-blue-100 rounded-lg overflow-y-auto'>
          <Controller
            name='address'
            control={control}
            render={({ field }) => (
              <FormAddressInput
                label='Address:'
                field={field}
                name='address'
                placeholder='Enter Your address'
                setValue={setAddressValue}
              />
            )}
          />

          {fields.map((f) => (
            <FormInput key={f.name} {...f} register={register} error={errors[f.name]?.message} />
          ))}

          <ReCAPTCHA
            size='normal'
            ref={captchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY as string}
            onChange={changeCaptchaHandler}
          />
        </div>

        <div className='flex-grow lg:flex-grow-[2] flex-shrink-0 p-4 bg-blue-100 rounded-lg'>
          <ProductsList list={shoppintCart} />
        </div>
      </div>

      <div className='flex items-center justify-end gap-6 p-2 bg-blue-100 rounded-lg'>
        <p>Total price: {convertNumberToMoney(totalPrice)}</p>
        <button
          className='px-4 py-2 bg-yellow-500 text-black rounded-md disabled:opacity-30'
          type='submit'
          disabled={!isCanSubmit || isSubmitting}
        >
          {isSubmitting ? 'Loading...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export default ShoppingCartForm;
