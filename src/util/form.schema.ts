import * as yup from "yup";
import { ObjectShape } from "yup/lib/object";

export const formSchema: yup.ObjectSchema<ObjectShape> = yup.object().shape({
  requestedKey: yup
    .string()
    .trim()
    .matches(/^[a-z0-9-]+$/i),
  url: yup.string().trim().url().required(),
});

export interface UrlForm {
  requestedKey: string;
  url: string;
}
