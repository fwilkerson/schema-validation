import { LengthValidator } from "./length";
import { createTypeError } from "./util";

export class StringValidator extends LengthValidator {
  constructor(min?: number, max?: number) {
    super(min, max);
    this.validations.unshift((val: any, name: string) => {
      if (val != null && typeof val !== "string") {
        throw createTypeError(name, "a string", val);
      }
    });
  }
}
