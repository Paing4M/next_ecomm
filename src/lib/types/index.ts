import {z} from "zod";
import {ZCategorySchema, ZProductSchema, ZReviewSchema} from "@/lib/validator";

export type ZProductSchemaI = z.infer<typeof ZProductSchema>;
export type ZReviewSchemaI = z.infer<typeof ZReviewSchema>;
export type ZCategorySchemaI = z.infer<typeof ZCategorySchema>;


export type StringMap = {
  [key: string]: string;
}