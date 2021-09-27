export class Input {
  node: HTMLInputElement;

  constructor(parentNode: HTMLElement, styles: string[] = [], type = '') {
    this.node = document.createElement('input');
    parentNode.append(this.node);
    this.node.classList.add(...styles);
    this.node.setAttribute('type', type);
  }
}
