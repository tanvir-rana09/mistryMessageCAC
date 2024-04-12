import { z } from "zod";

export const accecptMessageSchema = z.object({
    accecptMessage: z.boolean(),
});
