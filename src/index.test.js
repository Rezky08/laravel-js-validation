const ReactFormValidation = require("./index.js");
const faker = require("faker");
faker.locale = "id_ID";

class validationTest {
  constructor() {
    this.state = {
      fields: {
        name: faker.name.findName(),
        password: faker.random.alphaNumeric(12),
        status: true,
        address: faker.address.streetAddress(true),
        isPrimaryAddress: true,
        startDate: new Date("2021-12-05"),
        endDate: new Date("2021-12-04"),
      },
      errors: {},
      rules: {
        name: "required",
        password: ["required", "confirmed"],
        status: ["required", "accepted"],
        address: ["required_if:status,true"],
        isPrimaryAddress: ["required_if:address", "accepted_if:status"],
        startDate: ["after:endDate"],
      },
    };
    this.state.fields["password_confirmation"] = this.state.fields.password;

    this.instanceValidation = new ReactFormValidation.default(this);

    test("Instantiate Test", () => {
      expect(this.instanceValidation.constructor.name).toBe(
        "instanceValidation"
      );
    });

    this.instanceValidation.useRules(this.state.rules);

    test("Assign Rules", () => {
      expect(Object.entries(this.instanceValidation.rules).length).toBe(
        Object.entries(this.state.rules).length
      );
    });

    Object.keys(this.instanceValidation.rules).forEach((rule) => {
      test(`Rule [${rule}] was assigned`, () => {
        expect(Object.keys(this.state.rules).includes(rule)).toBe(true);
      });
    });
  }
  setState(state) {
    this.state = { ...this.state, ...state };
  }
  render() {
    this.instanceValidation.validateAll();
    test("Validation has no errors", () => {
      expect(Object.keys(this.state.errors).length).toBe(0);
    });
    console.log(this.state.errors);
    // this.instanceValidation.validateAll("password");
  }
}

let validator = new validationTest();
validator.render();
