interface Props {
  [key: string]: string;
}

type State = any;

export class Element<P = Props> extends HTMLElement {
  public template: string;
  protected state: State = null;
  protected props: P | Props = {};
  protected root: ShadowRoot;
  protected render?(props: P, state: State): string;
  protected mounted?(): void;
  protected unmounted?(): void;

  constructor(initialState?: State) {
    super();
    this.props = this.getProps();
    this.attachShadow({ mode: "open" });
    this.root = this.shadowRoot!;
    this.setState(initialState);
    this.mount();
  }

  protected setState(state: State) {
    this.state = state;
    this.refresh();
  }

  connectedCallback() {
    this.mounted && this.mounted();
  }

  disconnectedCallback() {
    this.unmounted && this.unmounted();
  }

  private refresh() {
    this.mount();
  }

  private mount() {
    if (this.render) {
      const html = this.render(this.props as P, this.state);
      this.root.innerHTML = html;
      this.mounted && this.mounted();
    }
  }

  private getProps(): Props {
    const attributes = this.attributes;
    const props: Props = {};

    for (const item of attributes) {
      props[item.name] = item.value;
    }

    return props;
  }
}
