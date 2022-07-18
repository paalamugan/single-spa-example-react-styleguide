import { rest } from "msw";

export const state = {};
export const handlers = [
  rest.get("/api/test", (req, res, ctx) => {
    return res(
      ctx.json({status: "Ok"})
    );
  }),
];
