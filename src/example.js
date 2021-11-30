import ReactFormValidation from "./index.js";

class validationTest {
  constructor() {
    this.state = {
      fields: {
        name: "test",
        password: "abc",
        password_confirmation: "abc",
        start_date: "",
        end_date: new Date(),
      },
      errors: {},
    };
    const instanceValidation = new ReactFormValidation(this);
    instanceValidation.useRules({
      name: "required|filled",
      password: ["required", "confirmed"],
      password_confirmation: ["required"],
      start_date: ["required"],
      end_date: ["required"],
    });
    instanceValidation.validate();
    this.setState({ fields: { ...this.state.fields, start_date: new Date() } });
    instanceValidation.validate();
  }
  setState(state) {
    this.state = { ...this.state, ...state };
  }
}
new validationTest();
