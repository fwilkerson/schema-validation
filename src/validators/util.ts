import { Schema, Validator } from "./base";

export function createTypeError(name: string, expected: string, val: any) {
  const msg = `${name} is expected to be ${expected}, instead it is ${typeof val}`;
  const err = new TypeError(msg);
  return err;
}

export function validate(schema: Schema, obj: any) {
  if (schema instanceof Validator) schema.run(obj, "The property");
  else {
    for (let prop in schema) {
      if (typeof schema[prop].run === "function") {
        schema[prop].run(obj[prop], prop);
      } else validate(schema[prop], obj[prop]);
    }
  }
}
