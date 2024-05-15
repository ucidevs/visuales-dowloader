export default class Switch extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  observedAttributes() {
    return ["active"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  toggle = () => {
    this.dispatchEvent(
      new CustomEvent("change", {
        composed: true,
        bubbles: true,
        detail: { value: !this.hasAttribute("active") },
      })
    );
    this.render();
  };

  render() {
    this.shadowRoot.innerHTML = this.template() + this.styles();
    this.shadowRoot.querySelector(".switch-container").addEventListener("click", this.toggle);
  }

  template() {
    return /*html*/ `
    <div class="container">
        <label for="switch-container">${this.getAttribute("setting")}</label>
        <div class="switch-container ${
          this.hasAttribute("active") === true ? "active" : ""
        }" id="switch-container" role="switch">
            <div class="thumb" id="thumb"></div>
        </div>
    </div>
    `;
  }

  styles() {
    return /*html*/ `
    <style>
        .container {
            transition: all .2s cubic-bezier(0.19, 1, 0.22, 1);
            padding: 5px;
            display: flex;
            flex-direction: row;
            width: 100%;
            align-items: center;
            justify-content: space-between;
        }

        .switch-container.active {
          background-color: green;
        }

        .switch-container.active .thumb {
          transform: translateX(100%);
        }

        label {
            white-space: nowrap;
        }

        .switch-container {
            transition: all .2s cubic-bezier(0.19, 1, 0.22, 1);
            cursor: pointer;
            display: flex;
            background-color: gray;
            border-radius: 40px;
            padding: 5px;
            width: 50px;
            margin-left: 15px;
        }

        .thumb {
            transition: all .2s cubic-bezier(0.19, 1, 0.22, 1);
            width: 25px;
            height: 25px;
            background-color: white;
            border-radius: 50%;
        }
    </style>`;
  }
}
