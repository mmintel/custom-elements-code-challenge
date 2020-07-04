import { Element } from "../../lib/element";
import { FormField } from "../../lib/form-field";

interface FormProps {
  action: string;
  method: string;
}

interface FormData {
  [key: string]: any;
}

const SUBMIT_KEY = "Enter";
const SUBMIT_EVENT = "onSubmit";

export class Form extends Element<FormProps> {
  private form: HTMLElement | null;
  private submitButton: HTMLElement | null;
  private fields: NodeListOf<FormField<any>> | [];
  private hasInvalidField: boolean;

  protected mounted = () => {
    this.form = this.root.querySelector("form");
    this.submitButton = this.querySelector('[type="submit"]');
    this.fields = this.querySelectorAll("[name]");

    if (this.form) {
      this.form.addEventListener("keypress", this.handleKeypress);
      this.form.addEventListener(SUBMIT_EVENT, this.handleSubmit);
    }

    if (this.submitButton) {
      this.submitButton.addEventListener("click", this.submit);
    }
  };

  protected unmounted = () => {
    if (this.form) {
      this.form.removeEventListener(SUBMIT_EVENT, this.handleSubmit);
    }

    this.form = null;
    this.submitButton = null;
    this.fields = [];
  };

  private handleKeypress = (e: KeyboardEvent) => {
    if (e.key === SUBMIT_KEY) {
      this.submit();
    }
  };

  private handleSubmit = (e: CustomEvent) => {
    e.preventDefault();

    fetch(this.props.action, {
      method: this.props.method,
      body: JSON.stringify(e.detail),
    });
  };

  private getFormData() {
    const json: FormData = {};

    for (const field of this.fields) {
      if (field.validate && typeof field.validate === "function") {
        field.validate();

        if (!field.valid) {
          this.hasInvalidField = true;
        }
      }

      json[field.name] = field.value;
    }

    return json;
  }

  private submit = () => {
    const detail = this.getFormData();

    if (!this.hasInvalidField && this.form) {
      this.form.dispatchEvent(
        new CustomEvent(SUBMIT_EVENT, {
          detail,
        })
      );
    }
  };

  render({ action, method }: FormProps) {
    return /* html */ `
      <form action="${action}" method="${method}">
        <slot></slot>
      </form>
    `;
  }
}
