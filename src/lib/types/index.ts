import {z} from "zod";
import {ZProductSchema, ZReviewSchema} from "@/lib/validator";

export type ZProductSchemaI = z.infer<typeof ZProductSchema>;
export type ZReviewSchemaI = z.infer<typeof ZReviewSchema>;


export type StringMap = {
  [key: string]: string;
}