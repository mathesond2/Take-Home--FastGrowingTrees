import { ParsedProducts, Product } from '@/types/data';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createMocks } from 'node-mocks-http';
import handler from '../products';

describe('/api/products', () => {
  test('returns a succesful response with all products and recommendations', async () => {
    const {
      req,
      res,
    }: {
      req: NextApiRequest;
      res: NextApiResponse<ParsedProducts>;
    } = createMocks({ method: 'GET' });

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(
      expect.objectContaining({
        products: expect.any(Array<Product>),
        recommendations: expect.any(Array<Product>),
      }),
    );
  });
});
