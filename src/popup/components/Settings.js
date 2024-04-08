export default class Settings extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  observedAttributes() {
    //   return ["active"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    
  }

  connectedCallback() {
    this.render();

    this.shadowRoot.querySelectorAll("x-switch").forEach((element) => {
      element.addEventListener("change", (event) => {
        console.log(event.detail.value);
        event.detail.value === true
          ? element.setAttribute("active", "")
          : element.removeAttribute("active");
      });
    });
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
