import { Element } from "./element";

interface FormFieldProps {
  name: string;
}

export abstract class FormField<P> extends Element<P & FormFieldProps> {
  public valid: boolean;
  public validate?(): void;

  public get name() {
    return this.props.name;
  }

  public abstract get value(): any;
}
