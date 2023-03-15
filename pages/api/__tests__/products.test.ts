import { Product } from '@/types/data';
import handler from '../products';

describe('/api/products', () => {
  test('returns a succesful response with all products and recommendations', async () => {
    const res: Response = handler();
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        products: expect.any(Array<Product>),
        recommendations: expect.any(Array<Product>),
      }),
    );
  });
});
