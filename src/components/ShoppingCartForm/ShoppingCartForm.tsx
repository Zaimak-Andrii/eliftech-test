'use client';

import { useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ReCAPTCHA from 'react-google-recaptcha';
import * as yup from 'yup';
import { useShoppingCart } from '@/hooks';
import FormInput from './FormInput';
import { convertNumberToMoney } from '@/helpers';
import ProductsList from './ProductsList';
import { toast } from 'react-toastify';
import { addOrderService } from '@/services/api';

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.number().positive().required(),
    address: yup.string().min(3).max(30).required(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const fields: { name: keyof FormData; label: string; placeholder: string; type: HTMLInputElement['type'] }[] = [
  { name: 'name', label: 'Name:', placeholder: 'Enter name', type: 'text' },
  { name: 'email', label: 'Email:', placeholder: 'Enter email', type: 'email' },
  { name: 'phone', label: 'Phone:', placeholder: 'Enter phone', type: 'tel' },
  { name: 'address', label: 'Address:', placeholder: 'Enter address', type: 'text' },
];

function ShoppingCartForm() {
  const { value: shoppintCart, setValue: setShoppingCart } = useShoppingCart();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });
  const captchaRef = useRef<ReCAPTCHA | null>(null);
  const [isCaptchaSuccess, setIsCaptchaSuccess] = useState(false);
  const totalPrice = shoppintCart.reduce((acc, p) => acc + p.count * p.price, 0);
  const isCanSubmit = isValid && isCaptchaSuccess && shoppintCart.length > 0;

  const changeCaptchaHandler = useCallback(() => {
    setIsCaptchaSuccess(true);
  }, []);

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

      reset();
      setShoppingCart([]);
      setIsCaptchaSuccess(false);
      captchaRef.current?.reset();
      toast.success('Your order accepted success.');
    },
    [reset, setShoppingCart, shoppintCart]
  );

  return (
    <form className='flex gap-4 flex-col w-full overflow-y-auto' onSubmit={handleSubmit(submitHandler)}>
      <div className='flex flex-grow gap-4'>
        <div className='flex flex-col gap-4 w-[40%] flex-shrink-0 p-2 bg-blue-100 rounded-lg'>
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

        <div className='w-full p-4 bg-blue-100 rounded-lg overflow-y-auto'>
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
