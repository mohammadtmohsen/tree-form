import { useForm } from 'react-hook-form';

import { NestedCategories } from './NestedCategories';
import { FormValue } from './Form.type';

export const Form: React.FC = () => {
  const { control, watch, handleSubmit } = useForm<FormValue>({
    defaultValues: {
      categories: [
        {
          name: '0',
          categories: [],
        },
      ],
    },
  });

  const categories = watch('categories');

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 items-start w-full'>
      <form
        onSubmit={handleSubmit((data) => console.log('data', data))}
        className='lg:col-span-2 flex flex-col gap-2 rounded-lg border border-white/10 bg-white/[0.02] p-4 text-left overflow-x-auto'
      >
        <div className='flex items-center justify-between mb-2'>
          <h3 className='text-sm uppercase tracking-wider text-white/50 m-0'>
            Tree
          </h3>
          <span className='text-[11px] text-white/30'>
            indentation reflects depth
          </span>
        </div>
        <div className='min-w-max'>
          <NestedCategories control={control} nestIndex='' />
        </div>
      </form>

      <aside className='lg:col-span-1 lg:sticky lg:top-4 flex flex-col rounded-lg border border-white/10 bg-black/40 overflow-hidden'>
        <div className='flex items-center justify-between px-4 py-2 border-b border-white/10 shrink-0'>
          <h3 className='text-sm uppercase tracking-wider text-white/50 m-0'>
            JSON preview
          </h3>
          <span className='text-[11px] text-white/30 font-mono'>live</span>
        </div>
        <pre className='m-0 p-4 text-left text-xs leading-relaxed text-emerald-200 flex-1 overflow-auto'>
          {JSON.stringify(categories, null, 2)}
        </pre>
      </aside>
    </div>
  );
};
