import { CloudflareAi } from "cf_ai";

const ai = new CloudflareAi({
  accountId: Deno.env.get("CF_ACCOUNT_ID")!,
  apiToken: Deno.env.get("CF_API_TOKEN")!,
});

export const run = ai.run.bind(ai);
