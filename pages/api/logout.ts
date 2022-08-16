import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setHeader('Set-Cookie', serialize('token', ''));

  return res.status(200).json({
    success: true,
  });
}
