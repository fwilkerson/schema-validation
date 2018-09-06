import { Validator } from "./base";

export class LengthValidator extends Validator {
  constructor(min?: number, max?: number) {
    super();

    if (min) this.min(min);
    if (max) this.max(max);
  }

  min(min: number) {
    this.validations.push((val: any, name: string) => {
      if (val != null && val.length < min) {
        throw new Error(`${name} cannot have a length of less than ${min}`);
      }
    });
    return this;
  }

  max(max: number) {
    this.validations.push((val: any, name: string) => {
      if (val != null && val.length > max) {
        throw new Error(`${name} cannot have a length that exceeds ${max}`);
      }
    });
    return this;
  }
}
