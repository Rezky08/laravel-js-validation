import ReactFormValidation from "./index.js";

class validationTest {
  constructor() {
    this.state = {
      fields: {
        name: "test",
        password: "abc",
        password_confirmation: "abc",
      },
      errors: {},
    };
    const instanceValidation = new ReactFormValidation(this);
    instanceValidation.useRules({
      name: "required|filled",
      password: ["required", "confirmed"],
      password_confirmation: ["required"],
    });
    console.log(this.state.errors);
    instanceValidation.validate();
    console.log(this.state.errors);
  }
  setState(state) {
    this.state = { ...this.state, ...state };
  }
}
new validationTest();
