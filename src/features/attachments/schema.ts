import z from "zod";

import { ACCEPTED, MAX_SIZE } from "./constants";
import { sizeInMB } from "./utils/size";

export const fileSchema = z
  .custom<FileList>()
  .transform((files) => Array.from(files))
  .transform((files) => files.filter((file) => file.size > 0))
  .refine(
    (files) => files.filter((file) => sizeInMB(file.size) <= MAX_SIZE),
    `Max file size is ${MAX_SIZE} MB`
  )
  .refine(
    (files) => files.every((file) => ACCEPTED.includes(file.type)),
    `Accepted file types: ${ACCEPTED.join(", ")}`
  );
