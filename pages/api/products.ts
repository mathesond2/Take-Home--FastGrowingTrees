import type { NextApiRequest, NextApiResponse } from 'next';
import data from '../../data.json';
import { RawData, Product, ParsedProducts } from '@/types/data';

function parseStaticJSONData(data: RawData): ParsedProducts {
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
  const parsedData = parseStaticJSONData(data);
  res.status(200).json(parsedData);
}
