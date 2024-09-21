import { Box, Typography } from '@mui/material';
import './App.css';
import { Form } from './components/Form/Form';
import { LimitForm } from './components/LimitForm/LimitForm';
import { LimitProvider } from './context';

function App() {
  return (
    <LimitProvider>
      <Box display={'flex'} flexDirection={'column'} gap={5}>
        <Typography variant='h4'>Tree Form</Typography>
        <LimitForm />
        <Form />
      </Box>
    </LimitProvider>
  );
}

export default App;
