import { ParsedProduct, Product } from '@/types/data';
import type { NextApiRequest, NextApiResponse } from 'next';
import data from '../../../data.json';

const notFoundStatus = 'not found' as const;
type NotFoundStatus = typeof notFoundStatus;

function parseProductData(products: Product[], productID: number): ParsedProduct | NotFoundStatus {
  const foundProduct = products.find((product) => product.id === productID);
  if (!foundProduct) {
    return notFoundStatus;
  }

  const { id, title, body, price, product_type, images } = foundProduct;
  const { src, alt } = images[0];
  return { id, title, body, price, product_type, src, alt };
}

export default function handler(req: NextApiRequest, res: NextApiResponse<ParsedProduct | { error: string }>) {
  const { id } = req.query;
  const parsedId = typeof id === 'string' ? parseInt(id) : id;

  if (!parsedId || typeof parsedId !== 'number') {
    res.status(400).json({ error: 'Bad request: please provide a valid number as "id" query param' });
    return;
  }

  const parsedData = parseProductData(data.products, parsedId);
  if (parsedData === notFoundStatus) {
    res.status(404).json({ error: `Not found: product with id of ${id} was not found` });
    return;
  }

  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  res.status(200).json(parsedData);
}

export const config = {
  runtime: 'edge',
};
