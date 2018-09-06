A utility to doing basic schema validation on a plain old javascript object.

```javascript
const schema = {
  text: is
    .string()
    .required()
    .min(3)
    .max(255),
  options: is
    .array()
    .of(
      is
        .string()
        .min(1)
        .max(255)
    )
    .required()
    .min(2)
    .max(42),
  multiSelect: validate.boolean()
};
```
