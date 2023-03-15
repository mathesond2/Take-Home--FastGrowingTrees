import { ParsedProducts, Product, RawData } from '@/types/data';
import type { NextApiRequest, NextApiResponse } from 'next';
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

export default function handler(req: NextApiRequest, res: NextApiResponse<ParsedProducts>) {
  const parsedData = parseProductsData(data);
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  res.status(200).json(parsedData);
}

export const config = {
  runtime: 'edge',
};
