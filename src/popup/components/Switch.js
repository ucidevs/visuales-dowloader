export default class Switch extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  observedAttributes() {
    return ["active"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "active") this.render();
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
        <label for="switch-container" id="switch">${ this.getAttribute("setting") }</label>
        <div class="switch-container" id="switch" role="switch">
            <div class="thumb" id="thumb"></div>
        </div>
    </div>
    `;
  }

  styles() {
    return /*html*/ `
    <style>
        .container {
            padding: 5px;
            display: flex;
            flex-direction: row;
            width: 100%;
            align-items: center;
            justify-content: space-between;
        }

        label {
            white-space: nowrap;
        }

        .switch-container {
            cursor: pointer;
            display: flex;
            width: fi;
            background-color: gray;
            border-radius: 40px;
            padding: 5px;
            width: 50px;
            margin-left: 15px;
        }

        .thumb {
            width: 25px;
            height: 25px;
            background-color: white;
            border-radius: 50%;
        }
    </style>`;
  }
}