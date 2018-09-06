import { Validator } from "./base";
import { createTypeError } from "./util";

export class NumberValidator extends Validator {
  constructor() {
    super();
    this.validations.push((val: any, name: string) => {
      if (val != null && typeof val !== "number") {
        throw createTypeError(name, "a number", val);
      }
    });
  }
}
