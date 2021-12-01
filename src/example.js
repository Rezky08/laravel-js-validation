import ReactFormValidation from "./index.js";
class validationTest {
  constructor() {
    this.state = {
      fields: {
        name: "2",
        status: true,
        password: "abc",
        password_confirmation: "abc",
        start_date: new Date(),
        end_date: new Date(),
        nested: {
          nestedV1: "test",
        },
        nestedArrayObjectEmpty: [],
        nestedArrayObject: [
          {
            name: "",
            point: 1,
          },
          {
            name: "test",
            point: 1,
          },
          {
            name: "test",
            point: 1,
          },
        ],
        nestedArrayObjectNested: [
          {
            nested: [
              {
                name: "",
                point: 1,
              },
              ,
              {
                name: "test",
                point: 1,
              },
              ,
              {
                name: "test",
                point: 1,
              },
              ,
            ],
          },
          {
            nested: [
              {
                name: "",
                point: 1,
              },
              ,
              {
                name: "test",
                point: 1,
              },
              ,
              {
                name: "test",
                point: 1,
              },
              ,
            ],
          },
        ],
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
      "nestedArrayObjectEmpty.*": ["required"],
      "nestedArrayObject.*.name": ["required"],
      "nestedArrayObjectNested.*.nested.*.name": ["required_if:status,true"],
    });
    // this.instanceValidation.validateAll();
  }
  setState(state) {
    this.state = { ...this.state, ...state };
  }
  render() {
    // console.log(this.instanceValidation.getField("nestedArrayObject.*.name"));
    this.instanceValidation.validateAll("password");
    console.log(this.state.errors);
  }
}
let validator = new validationTest();
validator.render();
