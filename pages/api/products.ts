import { ParsedProducts, Product, RawData } from '@/types/data';
import data from '../../data.json';

function parseProductsData(data: RawData): ParsedProducts {
  function parseData(data: Product[]) {
    return data.map(({ id, title, thumbnail }) => {
      const { src } = thumbnail;
      return { id, title, src };
    });
  }

  const { products, recommendations } = data;

  return {
    products: parseData(products),
    recommendations: parseData(recommendations),
  };
}

export const config = {
  runtime: 'edge',
};

export default function handler() {
  const parsedData = parseProductsData(data);
  return new Response(JSON.stringify(parsedData), {
    status: 200,
    headers: {
      'Cache-Control': 's-maxage=86400, stale-while-revalidate',
      'content-type': 'application/json',
    },
  });
}
