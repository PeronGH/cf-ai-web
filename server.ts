import "std/dotenv/load.ts";
import { Hono } from "hono/mod.ts";
import { serveStatic } from "hono/middleware.ts";
import { assetsRouter } from "$/routes/assets.ts";
import { run } from "$/utils/ai.ts";

const app = new Hono();
app.route("/assets", assetsRouter);

app.post("/run/*", async (ctx) => {
  const model = ctx.req.path.slice("/run/".length);
  try {
    return ctx.json(await run(model, ctx.req.raw.body));
  } catch (error) {
    return ctx.json(error?.cause ?? { error });
  }
});

app.get("*", serveStatic({ root: "./static/" }));
Deno.serve(app.fetch);
