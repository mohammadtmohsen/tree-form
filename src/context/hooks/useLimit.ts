import { useContext } from 'react';
import { LimitContext } from '../LimitContext';

export const useLimit = () => {
  const context = useContext(LimitContext);
  if (!context) {
    throw new Error('useLimit must be used within a LimitProvider');
  }
  return context;
};
