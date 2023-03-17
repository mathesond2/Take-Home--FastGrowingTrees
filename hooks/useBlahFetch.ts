import { useEffect, useReducer, useRef } from 'react';
import { useCart } from '../util/CartContext';

type FetchAction = {
  readonly type: 'error' | 'loading' | 'success';
  readonly data?: any | null; //TODO: type this better
};

export type FetchState = {
  error: boolean;
  loading: boolean;
  data: any | null; //TODO: type this better
};

const initialFetchData: FetchState = {
  error: false,
  loading: false,
  data: null,
};

const fetchDataReducer = (state: FetchState, action: FetchAction): FetchState => {
  switch (action.type) {
    case 'error':
      return {
        ...state,
        loading: false,
        error: true,
      };
    case 'loading':
      return {
        ...state,
        loading: true,
        error: false,
      };
    case 'success':
      return {
        error: false,
        loading: false,
        data: action.data || null,
      };
    default:
      throw new Error('Unhandled action type: ' + action.type);
  }
};

const fetchEndpoint = async (path: string) => {
  const apiEndpoint = '';
  const headers = new Headers(); //may be unnecessary here...check for security

  const req = new Request(`${apiEndpoint}/${path}`, {
    method: 'GET',
    headers,
  });
  const response = await fetch(req);
  const data = await response.json();
  return data;
};

export function useCartFetch(path: string): FetchState {
  const searchedItemRef = useRef<string | null>(null);
  const { item } = useCart();
  const [fetchData, dispatchFetchData] = useReducer(fetchDataReducer, initialFetchData);
  const { data, loading, error } = fetchData;

  useEffect(() => {
    const fetchData = async () => {
      dispatchFetchData({ type: 'loading' });
      try {
        const res = await fetchEndpoint(`${path}`);

        if (res.data) {
          dispatchFetchData({
            type: 'success',
            data: res.data,
          });
        } else {
          dispatchFetchData({ type: 'error' });
        }

        searchedItemRef.current = item!;
      } catch (error) {
        dispatchFetchData({ type: 'error' });
        console.error(`error: ${error}`);
      }
    };

    if ((!data && !error && item) || (!loading && item && searchedItemRef.current !== item)) {
      fetchData();
    }
  }, [data, error, item]);

  return { data, loading, error };
}
