import { Box, FormControlLabel, Slider, Switch } from '@mui/material';
import { useLimit } from '../../context';

export const LimitForm = () => {
  const { limit, setLimit, limited, setLimited } = useLimit();

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={4}
      maxWidth={'300px'}
      marginRight={'auto'}
    >
      <FormControlLabel
        sx={{ display: 'flex', justifyContent: 'space-between' }}
        control={
          <Switch
            color='primary'
            checked={limited}
            onChange={(e) => {
              setLimited(e.target.checked);
              setLimit(e.target.checked ? 3 : Infinity);
            }}
          />
        }
        label='limited'
        labelPlacement='start'
      />
      <FormControlLabel
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: 0,
        }}
        control={
          <Slider
            aria-labelledby='input-slider'
            valueLabelDisplay='on'
            disabled={!limited}
            value={limit}
            onChange={(_, value) => {
              setLimit(Number(value));
            }}
          />
        }
        label='set maximum nested levels'
        labelPlacement='top'
      />
    </Box>
  );
};
