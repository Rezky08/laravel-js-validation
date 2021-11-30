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
    this.instanceValidation = new ReactFormValidation(this);
    this.instanceValidation.useRules({
      name: "required|filled",
      password: ["required", "confirmed"],
      password_confirmation: ["required"],
      start_date: ["required"],
      end_date: ["required_if:name,2"],
    });
    this.instanceValidation.validateAll();
    console.log(this.state.errors);
  }
  setState(state) {
    this.state = { ...this.state, ...state };
  }
  render() {
    this.instanceValidation.blurEventHandler("test", () => console.log("Test"));
  }
}
let validator = new validationTest();
validator.render();
