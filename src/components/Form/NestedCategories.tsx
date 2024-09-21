import { Control, Controller, useFieldArray } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { FormValue } from './Form.type';
import { Button, IconButton } from '@mui/material';
import {
  calculateLevel,
  getBackgroundColor,
  getPlaceholder,
} from '../../utils/helper';
import { useLimit } from '../../context';

export const NestedCategories = ({
  control,
  nestIndex,
}: {
  nestIndex: string;
  control: Control<FormValue>;
}) => {
  const { limit } = useLimit();

  const { fields, append, remove } = useFieldArray({
    control,
    name: nestIndex
      ? (`${nestIndex}.categories` as 'categories')
      : 'categories',
  });

  return (
    <div className='flex flex-col gap-4'>
      {fields?.map((category, index) => {
        const currentIndex = nestIndex
          ? `${nestIndex}.categories.${index}`
          : `categories.${index}`;

        return (
          <div
            key={category.id}
            className={`border rounded-lg p-4 ${getBackgroundColor(
              calculateLevel(nestIndex)
            )}`}
          >
            <Controller
              name={`${currentIndex}.name` as 'categories'}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className='mb-4'
                  value={typeof field.value === 'string' ? field.value : ''}
                  placeholder={getPlaceholder(currentIndex)}
                />
              )}
            />
            <IconButton onClick={() => remove(index)}>
              <DeleteIcon htmlColor='red' />
            </IconButton>
            <NestedCategories control={control} nestIndex={currentIndex} />
          </div>
        );
      })}
      {fields?.length < limit ? (
        <Button startIcon={<AddIcon />} onClick={() => append({ name: '' })}>
          Add Category
        </Button>
      ) : (
        <span>Limit Reached</span>
      )}
    </div>
  );
};
