import { RCButton, RCFieldset, RCPasswordInput, RCTextInput } from '@/shared/ui';
import { toast } from 'components/ui';
import { useForm } from 'react-hook-form';
import { signIn } from '../api/api';

type SignupFormValues = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  password: string;
};

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({ mode: 'all' });

  const onSubmit = async (data: SignupFormValues) => {
    const res = await signIn({ ...data, app_ids: [] });
    if (!res.success) return toast.error(res.message);
    toast.success(res.message || 'Signup Sucessfull');
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 to-slate-800 px-4'>
      <div className='w-full max-w-3xl rounded-2xl bg-white/95 shadow-xl p-8'>
        <h1 className='text-2xl font-semibold text-gray-800 text-center mb-6'>Create your account</h1>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
          <RCFieldset legend='Personal Information' className='font-poppins'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <RCTextInput
                label='First Name'
                placeholder='John'
                error={errors.first_name?.message}
                {...register('first_name', {
                  required: 'First name is required',
                  minLength: { value: 2, message: 'Too short' },
                })}
              />

              <RCTextInput
                label='Last Name'
                placeholder='Doe'
                error={errors.last_name?.message}
                {...register('last_name', {
                  required: 'Last name is required',
                })}
              />
            </div>
          </RCFieldset>

          <RCFieldset legend='Account Details' className='font-poppins'>
            <div className='flex flex-col gap-2'>
              <RCTextInput
                label='Username'
                placeholder='john_doe'
                error={errors.username?.message}
                {...register('username', {
                  required: 'Username is required',
                  minLength: { value: 4, message: 'Min 4 characters' },
                })}
              />

              <RCTextInput
                label='Email'
                placeholder='john@example.com'
                error={errors.email?.message}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: 'Invalid email',
                  },
                })}
              />

              <RCTextInput
                label='Phone Number'
                placeholder='9876543210'
                error={errors.phone?.message}
                {...register('phone', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: 'Invalid Indian phone number',
                  },
                })}
              />

              <RCTextInput
                label='Address'
                placeholder='Street, City, State'
                error={errors.address?.message}
                {...register('address', {
                  required: 'Address is required',
                })}
              />

              <RCPasswordInput
                label='Password'
                placeholder='••••••••'
                error={errors.password?.message}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Min 8 characters',
                  },
                })}
              />
            </div>
          </RCFieldset>

          <RCButton type='submit' fullWidth size='md' loading={isSubmitting} className='mt-4'>
            Sign Up
          </RCButton>

          <p className='text-center text-sm text-gray-500'>
            Already have an account? <span className='text-blue-600 hover:underline cursor-pointer'>Login</span>
          </p>
        </form>
      </div>
    </div>
  );
}
