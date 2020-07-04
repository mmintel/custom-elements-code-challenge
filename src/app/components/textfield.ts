import { FormField } from "../../lib/form-field";

interface TextfieldProps {
  name: string;
  label: string;
  validation?: string;
}

interface TextfieldState {
  error: string | null;
  innerValue: string;
}

export class Textfield extends FormField<TextfieldProps> {
  private input: HTMLInputElement | null;

  constructor() {
    super({
      error: null,
      innerValue: "",
    });
  }

  protected mounted = () => {
    this.input = this.root.querySelector("input");

    if (this.input) {
      this.input.addEventListener("blur", this.handleChange);
    }
  };

  protected unmounted = () => {
    if (this.input) {
      this.input.removeEventListener("blur", this.handleChange);
    }

    this.input = null;
  };

  private handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    console.log("handle change with", target.value);

    this.setState({
      error: null,
      innerValue: target.value,
    });
  };

  public get valid() {
    return !this.state.error;
  }

  public get name() {
    return this.props.name;
  }

  public get value() {
    return this.state.innerValue;
  }

  public validate = () => {
    if (!this.props.validation) return true;

    const regex = new RegExp(this.props.validation);
    const valid = regex.test(this.value);

    if (!valid) {
      this.setState({
        error: "Validation error.",
        innerValue: this.state.innerValue,
      });
    } else {
      this.setState({
        error: null,
        innerValue: this.state.innerValue,
      });
    }
  };

  render(
    { label, name }: TextfieldProps,
    { error, innerValue }: TextfieldState
  ) {
    return /* html */ `
      <label for="${name}">${label}</label>
      <input name="${name}" value="${innerValue}" />
      ${error ? /* html */ `<p>${error}</p>` : ""}
    `;
  }
}
