import { useRecommendations } from '@/hooks/useRecommendations';
import { ParsedProduct } from '@/types/data';
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from 'react';
import { PRUNER_ID, TREE_PLANTING_KIT_ID } from './constants';

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

  const { cart, setCart, recommendations } = context;

  const recommendationsWithoutPruner = recommendations?.filter((item) => item.id !== PRUNER_ID);
  const prunerInCart = cart?.find((item) => item.id === PRUNER_ID);
  const parsedRecommendations = prunerInCart ? recommendationsWithoutPruner : recommendations;

  return { cart, setCart, parsedRecommendations };
}
