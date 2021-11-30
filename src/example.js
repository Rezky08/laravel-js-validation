import ReactFormValidation from "./index.js";

class validationTest {
  constructor() {
    this.state = {
      fields: {
        name: "2",
        password: "abc",
        password_confirmation: "abc",
        start_date: "",
        end_date: "",
      },
      errors: {},
    };
    const instanceValidation = new ReactFormValidation(this);
    instanceValidation.useRules({
      name: "required|filled",
      password: ["required", "confirmed"],
      password_confirmation: ["required"],
      start_date: ["required"],
      end_date: ["required_if:name,2"],
    });
    instanceValidation.validate();
    console.log(this.state.errors);
  }
  setState(state) {
    this.state = { ...this.state, ...state };
  }
}
new validationTest();
