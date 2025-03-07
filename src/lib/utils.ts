import {ZodError} from "zod";

export const getImageUrl = (image: string) => {
  return `/images/products/${image}`;
}


export const convertZodError = (error: ZodError) => {
  return error.issues.reduce((acc: { [key: string]: string }, issue) => {
    acc[issue.path[0]] = issue.message
    return acc
  }, {})
}

