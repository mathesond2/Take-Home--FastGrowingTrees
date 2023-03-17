import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react';
import { ParsedProduct } from '@/types/data';

type ItemState = ParsedProduct | undefined;
type ContextState = {
  item: ItemState;
  setItem: Dispatch<SetStateAction<ItemState>>;
};

const CartContext = createContext({} as ContextState);

export function CartProvider({ children }: PropsWithChildren) {
  const [item, setItem] = useState(undefined as ItemState);
  const value = { item, setItem };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
