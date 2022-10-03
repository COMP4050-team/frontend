import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../gql/client";
import { RegisterDocument } from "../../gql/generated/graphql";
import { withSentry } from "@sentry/nextjs";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
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
    return res.status(200).json({
      token: gqlResponse.data.register,
    });
  } else {
    return res.status(500).json({
      error: "No token returned from API",
    });
  }
}

export default withSentry(handler);
