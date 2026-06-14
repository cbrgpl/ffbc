import { z } from "zod";

const getErrorMessage: z.core.$ZodErrorMap = (issue) => {
  if (issue.code === "invalid_type" && issue.expected === "string") {
    return "The field is required";
  }

  if (issue.code === "invalid_format" && issue.format === "regex" && issue.pattern && issue.pattern.includes("[A-Za-z]")) {
    return "Only alphabets";
  }

  return undefined;
};

export const setupZod = () => {
  z.config({
    customError: getErrorMessage,
  });
};
