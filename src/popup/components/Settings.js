export default class Settings extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  observedAttributes() {
    //   return ["active"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    //   if (name === "active") this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = this.template() + this.styles();
  }

  template() {
    return /*html*/ `
      <div class="container">
        <x-switch active setting="Dark Mode"></x-switch>
        <x-switch setting="Super Mierda"></x-switch>
        <x-switch setting="Otra cosa"></x-switch>
        <x-switch active setting="Dark Mode"></x-switch>
        <x-dropdown options="hola mundo, alberto, adalberto, mierda">
      </div>
      `;
  }

  styles() {
    return /*html*/ `
      <style>
          :host {
            width: fit-content;
          }
      </style>`;
  }
}
