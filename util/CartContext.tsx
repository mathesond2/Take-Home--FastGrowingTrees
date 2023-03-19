import { useRecommendations } from '@/hooks/useRecommendations';
import { ParsedProduct } from '@/types/data';
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react';

type CartState = ParsedProduct[] | undefined;
type ContextState = {
  cart: CartState;
  setCart: Dispatch<SetStateAction<CartState>>;
  recommendations: ParsedProduct[] | null;
};

export const CartContext = createContext({} as ContextState);

export function CartProvider({ children }: PropsWithChildren) {
  const { loading, error, data: recommendations } = useRecommendations();
  const [cart, setCart] = useState(undefined as CartState);
  const value = { cart, setCart, recommendations };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
