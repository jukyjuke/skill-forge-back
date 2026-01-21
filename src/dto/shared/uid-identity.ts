import { z } from "zod";

export const CUIDIdentitySchema = z.object({
  cuid: z.cuid({ error: "ID must be a valid CUID" }),
});

export type CUIDIdentityDTO = z.infer<typeof CUIDIdentitySchema>;
