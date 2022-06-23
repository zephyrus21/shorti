import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/client";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query["slug"];

  if (!slug || typeof slug !== "string") {
    res.statusCode = 404;

    res.send(
      JSON.stringify({
        message: "Please use with a slug",
      })
    );

    return;
  }

  const data = await prisma.shorti.findFirst({
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (!data) {
    res.statusCode = 404;

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Cache-Control",
      "s-maxage=100000000000, stale-while-revalidate"
    );

    res.send(JSON.stringify({ message: "slug not found" }));

    return;
  }

  return res.json(data);
};
