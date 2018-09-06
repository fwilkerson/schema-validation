const test = require("japa");

const { is, validate } = require("../dist");

test("validate: array", assert => {
  const schema = { prop: is.array() };
  assert.throws(() => validate(schema, { prop: "not an array" }), TypeError);
  assert.doesNotThrow(() => validate(schema, { prop: [] }));
});

test("validate: array of", assert => {
  const schema = { prop: is.array().of(is.string().required()) };
  assert.throws(() => validate(schema, { prop: [1234] }), TypeError);
  assert.doesNotThrow(() => validate(schema, { prop: ["1234"] }));
});

test("validate: complex array of", assert => {
  const itemSchema = { prop: is.boolean().required() };
  const schema = { prop: is.array().of(itemSchema) };
  assert.throws(() => validate(schema, { prop: [{}] }), /is required/);
  assert.doesNotThrow(() => validate(schema, { prop: [{ prop: true }] }));
});

test("validate: boolean", assert => {
  const schema = { prop: is.boolean() };
  assert.throws(() => validate(schema, { prop: "not a boolean" }), TypeError);
  assert.doesNotThrow(() => validate(schema, { prop: true }));
});

test("validate: number", assert => {
  const schema = { prop: is.number() };
  assert.throws(() => validate(schema, { prop: "not a number" }), TypeError);
  assert.doesNotThrow(() => validate(schema, { prop: 1234 }));
});

test("validate: string", assert => {
  const schema = { prop: is.string() };
  assert.throws(() => validate(schema, { prop: false }), TypeError);
  assert.doesNotThrow(() => validate(schema, { prop: "indeed a string" }));
});

test("validate: string length", assert => {
  const schema = {
    prop: is
      .string()
      .min(3)
      .max(5)
  };
  assert.throws(() => validate(schema, { prop: "123456" }), /exceeds/);
  assert.throws(() => validate(schema, { prop: "12" }), /less than/);
  assert.doesNotThrow(() => validate(schema, { prop: "123" }));
  assert.doesNotThrow(() => validate(schema, { prop: "12345" }));
  assert.doesNotThrow(() => validate(schema, { prop: null }));
});

test("validate: nested schema", assert => {
  const nestedSchema = { second: is.boolean().required() };
  const schema = { first: is.boolean(), nested: nestedSchema };
  assert.throws(() => validate(schema, { nested: {} }), /is required/);
  assert.doesNotThrow(() =>
    validate(schema, { first: true, nested: { second: false } })
  );
});

test("validate: array shorthand schema", assert => {
  const schema = is.array(1, 3).of(is.string(1, 2).required());
  assert.throws(() => validate(schema, ["1", "", ""]));
  assert.throws(() => validate(schema, ["123"]));
  assert.doesNotThrow(() => validate(schema, ["12"]));
});
