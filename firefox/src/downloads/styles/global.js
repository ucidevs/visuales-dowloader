const globalStyles = /*css*/ `
body {
  background-color: #262428;
  color: #ebebeb;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
    Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    margin-bottom: 100px;
}

a {
  font-family: monospace;
  color: #e899fb;
  transition: transform 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
}

a:visited {
  color: #c77dd9;
  font-family: serif;
}

hr {
  border: 4px dashed #3e3c40;
}

a:hover {
  transform: translateY(-3px);
}

button {
  padding: 6px;
  background-color: #e899fb;
  border: 1px solid #bb6ccf;
  animation: floating 2s infinite;
  transition: all .2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  margin-left: 15px;
}

button:hover {
    animation: none;
    filter: brightness(0.93);
    transform: scale(1.05)
}

button:active {
  transform: scale(0.95)
}

.download-button {
    animation: floating 2s infinite;
    animation: scaleEntrance .1s cubic-bezier(0.19, 1, 0.22, 1) forwards;
    width: 50px;
    height: 50px;
    padding: 3px;
    position: fixed;
    bottom: 30px;
    right: 30px;
    background-color: #D3A8DE;
    border-radius: 50%;
    font-size: 25px;
}

@keyframes floating {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(5px);
  }

  100% {
    transform: translateY(0);
  }
}

@keyframes scaleEntrance {
 from {
    transform: scale(0);
    opacity: 0;
 }
 to {
    transform: scale(1);
    opacity: 1;
 }
}

.download-item {
    transition: all .2s cubic-bezier(0.19, 1, 0.22, 1);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 12px;
    background: #212121;
    border: 1px solid #5B5B5B;
    border-radius: 10px;
    margin-bottom: 5px;
    padding: 10px;
}

.download-item.checked {
    background-color: #3E3E3E;
}

.download-item:hover {
    filter: brightness(1.12);
}

.download-item:active {
    transform: scale(0.99);
}

.download-item input[type="checkbox"] {
    width: 12px;
    height: 12px;
}

.download-item h4 {
    pointer-events: none;
    font-weight: normal;
    margin: 0;
}

.items-view {
    margin-top: 20px;
}

.subtitle {
  font-family: monospace;
  font-size: 12pt;
}
`;
