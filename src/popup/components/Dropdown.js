export default class Leonardo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  observedAttributes() {
    return ["hola"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // if (name === ""hola"") this.render();
  }

  connectedCallback() {
    this.render();

    // Events
  }

  render() {
    this.shadowRoot.innerHTML = this.template() + this.styles();
  }

  template() {
    return /*html*/ `
      <div>
        <!-- Template here -->
      </div>`;
  }

  styles() {
    return /*html*/ `
      <style>
        /* Styles here */
      </style>`;
  }
}
