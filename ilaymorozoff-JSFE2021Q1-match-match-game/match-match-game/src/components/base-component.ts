export class BaseComponent {
  readonly node:HTMLElement | HTMLSelectElement;

  constructor(parentNode:HTMLElement = null, tagName = 'div', styles:string[] = [], content = '') {
    this.node = document.createElement(tagName);

    this.node.classList.add(...styles);

    this.node.innerHTML = content;
    parentNode.append(this.node);
  }
}
