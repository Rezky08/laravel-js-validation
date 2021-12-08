const ReactFormValidation = require("../index.js");

const validator = new ReactFormValidation.default();
let fields = {};
let errors = {};
validator.useSetErrorCallback((errors) => console.log(errors));
validator.useGetFields(() => fields);
validator.useSetError((errorList) => (errors = errorList));
console.log(validator.setErrorCallback);

test("validate SUCCESS before and after", () => {
  fields = {
    startDate: "2021-12-03",
    endDate: "2021-12-04",
  };

  validator.useRules({
    startDate: "before:endDate",
    endDate: "after:startDate",
  });

  validator.validateAll();

  expect(errors).toStrictEqual({});
});

test("validate FAIL before and after", () => {
  validator.useRules({
    startDate: "before:endDate",
    endDate: "after:startDate",
  });

  fields = {
    startDate: "2021-12-04",
    endDate: "2021-12-04",
  };

  validator.validateAll();

  Object.entries(fields).forEach(([key, value]) => {
    expect(errors).toHaveProperty(key);
  });

  fields = {
    startDate: "2021-12-05",
    endDate: "2021-12-04",
  };

  validator.validateAll();

  Object.entries(fields).forEach(([key, value]) => {
    expect(errors).toHaveProperty(key);
  });
});

test("validate before or equal & after or equal", () => {
  fields = {
    startDate: "2021-12-04",
    endDate: "2021-12-04",
  };

  validator.useRules({
    startDate: "before_or_equal:endDate",
    endDate: "after_or_equal:startDate",
  });

  validator.validateAll();

  expect(errors).toStrictEqual({});
});

test("validate FAIL before or equal & after or equal", () => {
  validator.useRules({
    startDate: "before_or_equal:endDate",
    endDate: "after_or_equal:startDate",
  });

  fields = {
    startDate: "2021-12-05",
    endDate: "2021-12-04",
  };

  validator.validateAll();

  Object.entries(fields).forEach(([key, value]) => {
    expect(errors).toHaveProperty(key);
  });
});
