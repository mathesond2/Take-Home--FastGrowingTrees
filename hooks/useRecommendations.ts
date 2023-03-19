import { ParsedProduct } from '@/types/data';
import { useEffect, useReducer } from 'react';

type FetchAction = {
  readonly type: 'error' | 'loading' | 'success';
  readonly data?: ParsedProduct[] | null;
};

export type FetchState = {
  error: boolean;
  loading: boolean;
  data: ParsedProduct[] | null;
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

const fetchEndpoint = async (apiEndpoint: string) => {
  const req = new Request(apiEndpoint, { method: 'GET' });
  const response = await fetch(req);
  const data = await response.json();
  return data;
};

export function useRecommendations(): FetchState {
  const [fetchData, dispatchFetchData] = useReducer(fetchDataReducer, initialFetchData);
  const { data, loading, error } = fetchData;

  useEffect(() => {
    const fetchData = async () => {
      dispatchFetchData({ type: 'loading' });
      try {
        const res = await fetchEndpoint('/api/recommendations');
        if (res) {
          dispatchFetchData({
            type: 'success',
            data: res,
          });
        } else {
          dispatchFetchData({ type: 'error' });
        }
      } catch (error) {
        dispatchFetchData({ type: 'error' });
        console.error(`error: ${error}`);
      }
    };

    if (!data && !error && !loading) {
      fetchData();
    }
  }, [data, error, loading]);

  return { data, loading, error };
}
