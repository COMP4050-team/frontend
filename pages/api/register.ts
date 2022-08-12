import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../gql/client';
import { RegisterDocument } from '../../gql/generated/graphql';
import { serialize } from 'cookie';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
    });
  }

  let gqlResponse;
  try {
    gqlResponse = await client
      .mutation(RegisterDocument, {
        email: req.body.email,
        password: req.body.password,
      })
      .toPromise();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error,
    });
  }

  if (gqlResponse?.error) {
    return res.status(500).json({
      error: gqlResponse.error.message,
    });
  }

  if (gqlResponse.data?.register) {
    res.setHeader(
      'Set-Cookie',
      serialize('token', gqlResponse.data.register, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // one day
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
      }),
    );
  }

  return res.status(200).json({
    success: true,
  });
}
