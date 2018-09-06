export class Validator {
  protected validations: Array<(val: any, name: string) => void> = [];

  required() {
    this.validations.unshift((val: any, name: string) => {
      if (val == null) {
        throw new Error(`${name} is required`);
      }
    });
    return this;
  }

  run(val: any, name: string) {
    for (let i = 0; i < this.validations.length; i++) {
      this.validations[i](val, name);
    }
  }
}

export type Schema = Validator | { [key: string]: Validator };
