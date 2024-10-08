import { useForm } from 'react-hook-form';

import { NestedCategories } from './NestedCategories';
import { FormValue } from './Form.type';

export const Form: React.FC = () => {
  const { control, watch, handleSubmit } = useForm<FormValue>({
    defaultValues: {
      categories: [
        {
          name: '',
          categories: [],
        },
      ],
    },
  });

  const categories = watch('categories');

  return (
    <div className='flex gap-10 items-start justify-center'>
      <form
        onSubmit={handleSubmit((data) => console.log('data', data))}
        className='flex flex-col gap-4'
      >
        <NestedCategories control={control} nestIndex='' />
      </form>
      <pre className='text-left'>{JSON.stringify(categories, null, 2)}</pre>
    </div>
  );
};
