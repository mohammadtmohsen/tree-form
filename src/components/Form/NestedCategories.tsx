import { Control, Controller, useFieldArray } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { FormValue } from './Form.type';
import { Button, IconButton } from '@mui/material';
import { calculateLevel, getLevelColor, getPlaceholder } from '../../utils/helper';
import { useLimit } from '../../context';

const INDENT_PX = 28;

export const NestedCategories = ({
  control,
  nestIndex,
}: {
  nestIndex: string;
  control: Control<FormValue>;
}) => {
  const { limit } = useLimit();
  const level = calculateLevel(nestIndex);

  const { fields, append, remove } = useFieldArray({
    control,
    name: nestIndex
      ? (`${nestIndex}.categories` as 'categories')
      : 'categories',
  });

  return (
    <div className='relative flex flex-col gap-1.5'>
      {fields?.length > 0 && (
        <div
          aria-hidden
          className='absolute pointer-events-none rounded-full'
          style={{
            left: level * INDENT_PX + 9,
            top: 14,
            bottom: 14,
            width: 2,
            backgroundColor: getLevelColor(level),
          }}
        />
      )}
      {fields?.map((category, index) => {
        const currentIndex = nestIndex
          ? `${nestIndex}.categories.${index}`
          : `categories.${index}`;
        const rowLevel = level;
        const accent = getLevelColor(rowLevel);

        return (
          <div key={category.id} className='flex flex-col gap-1.5'>
            <div
              className='flex items-center gap-2 rounded-md py-1.5 pr-2 hover:bg-white/5 transition-colors'
              style={{ paddingLeft: rowLevel * INDENT_PX + 8 }}
            >
              <span
                className='inline-block h-5 w-1 rounded-sm'
                style={{ backgroundColor: accent }}
                aria-hidden
              />
              <span
                className='text-[10px] font-mono px-1.5 py-0.5 rounded'
                style={{ backgroundColor: `${accent}33`, color: accent }}
              >
                L{rowLevel}
              </span>
              <Controller
                name={`${currentIndex}.name` as 'categories'}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    value={typeof field.value === 'string' ? field.value : ''}
                    placeholder={getPlaceholder(currentIndex)}
                    className='flex-1 min-w-[280px] bg-transparent border-b border-white/15 focus:border-white/60 outline-none px-1 py-0.5 text-sm text-white placeholder:text-white/30'
                  />
                )}
              />
              <IconButton size='small' onClick={() => remove(index)} aria-label='delete'>
                <DeleteIcon fontSize='small' htmlColor='#ef4444' />
              </IconButton>
            </div>
            <NestedCategories control={control} nestIndex={currentIndex} />
          </div>
        );
      })}
      {fields?.length < limit ? (
        <div style={{ paddingLeft: level * INDENT_PX + 8 }}>
          <Button
            size='small'
            startIcon={<AddIcon />}
            onClick={() => {
              const nextIndex = nestIndex
                ? `${nestIndex}.categories.${fields.length}`
                : `categories.${fields.length}`;
              append({ name: getPlaceholder(nextIndex) });
            }}
            sx={{
              textTransform: 'none',
              color: getLevelColor(level),
              '&:hover': { backgroundColor: `${getLevelColor(level)}1a` },
            }}
          >
            {level === 0 ? 'Add root category' : 'Add child'}
          </Button>
        </div>
      ) : (
        <span
          className='text-xs text-white/40'
          style={{ paddingLeft: level * INDENT_PX + 8 }}
        >
          Limit reached
        </span>
      )}
    </div>
  );
};
