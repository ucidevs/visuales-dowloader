import Settings from "./components/Settings.js";
import Switch from "./components/Switch.js";
import Dropdown from "./components/Dropdown.js";
import GridItem from "../downloads/components/GridItem.js";

function main() {
  customElements.define("x-switch", Switch);
  customElements.define("x-settings", Settings);
  customElements.define("x-dropdown", Dropdown);

  const xSwitch = document.querySelector("x-switch");
}

document.addEventListener("DOMContentLoaded", main);
