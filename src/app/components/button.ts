import { Element } from "../../lib/element";

export class Button extends Element {
  render() {
    return /* html */ `
      <button>
        <slot></slot>
      </button>
    `;
  }
}
