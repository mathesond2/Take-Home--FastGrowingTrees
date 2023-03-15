import { ParsedProduct } from '@/types/data';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createMocks } from 'node-mocks-http';
import handler from '../../product/[id]';

describe('/api/product/[id]', () => {
  function createMockRequest(id: string) {
    const {
      req,
      res,
    }: {
      req: NextApiRequest;
      res: NextApiResponse<ParsedProduct | { error: string }>;
    } = createMocks({ method: 'GET' });
    req.query = { id };
    return { req, res };
  }

  test('returns a succesful response with a product', async () => {
    const givenID = '1532751740980';
    const { req, res } = createMockRequest(givenID);
    await handler(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(expect.objectContaining({ id: parseInt(givenID) }));
  });

  test('returns a 400 response if no query is provided', async () => {
    const { req, res } = createMocks({ method: 'GET' });
    await handler(req, res);
    expect(res.statusCode).toBe(400);
  });

  test('returns a 400 response if query id is not a number', async () => {
    const { req, res } = createMockRequest('not a number');
    await handler(req, res);
    expect(res.statusCode).toBe(400);
  });

  test('returns a 404 response if query id is not found', async () => {
    const { req, res } = createMockRequest('9999999999999');
    await handler(req, res);
    expect(res.statusCode).toBe(404);
  });
});
