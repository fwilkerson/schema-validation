import { Schema } from "./base";
import { LengthValidator } from "./length";
import { createTypeError, validate } from "./util";

export class ArrayValidator extends LengthValidator {
  constructor(min?: number, max?: number) {
    super(min, max);

    this.validations.unshift((val: any, name: string) => {
      if (val != null && !Array.isArray(val)) {
        throw createTypeError(name, "an array", val);
      }
    });

    this.validations.unshift((val: any, name: string) => {
      if (val == null) {
        throw new Error(`${name} is required`);
      }
    });
  }

  of(schema: Schema) {
    this.validations.push((val: any[]) => {
      for (let i = 0; i < val.length; i++) {
        validate(schema, val[i]);
      }
    });
    return this;
  }
}
