import { Validator } from "./base";
import { createTypeError } from "./util";

export class BooleanValidator extends Validator {
  constructor() {
    super();
    this.validations.push((val: any, name: string) => {
      if (val != null && typeof val !== "boolean") {
        throw createTypeError(name, "a boolean", val);
      }
    });
  }
}
