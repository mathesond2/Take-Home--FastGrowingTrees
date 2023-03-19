import { RecommendationsFetchState, useRecommendations } from '@/hooks/useRecommendations';
import { ParsedProduct } from '@/types/data';
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react';
import { PRUNER_ID, TREE_PLANTING_KIT_ID, TREE_PRODUCT_TYPE } from './constants';

type CartState = ParsedProduct[] | undefined;
type ContextState = {
  cart: CartState;
  setCart: Dispatch<SetStateAction<CartState>>;
  recommendationData: RecommendationsFetchState;
};

export const CartContext = createContext({} as ContextState);

export function CartProvider({ children }: PropsWithChildren) {
  const recommendationData = useRecommendations();
  const [cart, setCart] = useState(undefined as CartState);
  const value = { cart, setCart, recommendationData };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function filterRecommendations(recommendations: ParsedProduct[], cart: CartState) {
  const recommendationsWithoutPruner = recommendations?.filter((item) => item.id !== PRUNER_ID);
  const prunerInCart = cart?.find((item) => item.id === PRUNER_ID);

  const recommendationsWithoutTreePlantingKit = recommendations?.filter((item) => item.id !== TREE_PLANTING_KIT_ID);
  const treeQuantityInCart = cart?.filter(({ product_type }) => product_type === TREE_PRODUCT_TYPE).length || 0;
  const treePlantingKitQuantityInCart = cart?.filter(({ id }) => id === TREE_PLANTING_KIT_ID).length || 0;

  let filteredRecommendations = prunerInCart ? recommendationsWithoutPruner : recommendations;
  filteredRecommendations =
    treeQuantityInCart <= treePlantingKitQuantityInCart && treeQuantityInCart > 0
      ? recommendationsWithoutTreePlantingKit
      : filteredRecommendations;

  return filteredRecommendations;
}

export function useCart() {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }

  const { cart, setCart, recommendationData } = context;
  const { data: recommendations } = recommendationData;
  const parsedRecommendations = recommendations ? filterRecommendations(recommendations, cart) : null;

  return {
    cart,
    setCart,
    recommendationData: {
      data: parsedRecommendations,
      loading: recommendationData.loading,
      error: recommendationData.error,
    },
  };
}
