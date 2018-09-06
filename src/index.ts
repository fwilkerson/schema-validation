import * as v from "./validators";

export const is = {
  array: (min?: number, max?: number) => new v.ArrayValidator(min, max),
  boolean: () => new v.BooleanValidator(),
  number: () => new v.NumberValidator(),
  string: (min?: number, max?: number) => new v.StringValidator(min, max)
};

export const validate = v.validate;
