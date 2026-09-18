import { z } from "zod";
import { formSchema } from ".";

export type IForm = z.infer<typeof formSchema>