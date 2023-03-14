import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react';

type ItemState = string | undefined;
type ContextState = {
  item: ItemState;
  setItem: Dispatch<SetStateAction<ItemState>>;
};

const BlahContext = createContext({} as ContextState);

export function BlahProvider({ children }: PropsWithChildren) {
  const [item, setItem] = useState(undefined as ItemState);
  const value = { item, setItem };
  return <BlahContext.Provider value={value}>{children}</BlahContext.Provider>;
}

export function useBlah() {
  const context = useContext(BlahContext);
  if (context === undefined) {
    throw new Error('useBlah must be used within a BlahProvider');
  }
  return context;
}
