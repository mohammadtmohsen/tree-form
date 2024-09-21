import { createContext, ReactNode, useState } from 'react';

interface LimitContextProps {
  limit: number;
  setLimit: (limit: number) => void;
  limited: boolean;
  setLimited: (limited: boolean) => void;
}
interface LimitProviderProps {
  children: ReactNode;
}

export const LimitContext = createContext<LimitContextProps | undefined>(
  undefined
);

export const LimitProvider: React.FC<LimitProviderProps> = ({ children }) => {
  const [limit, setLimit] = useState<number>(3);
  const [limited, setLimited] = useState<boolean>(true);

  return (
    <LimitContext.Provider value={{ limit, setLimit, limited, setLimited }}>
      {children}
    </LimitContext.Provider>
  );
};
