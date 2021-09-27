import { BaseComponent } from '../../base-component';
// eslint-disable-next-line import/no-cycle
import { options } from '../../variables';

export class Difficulty {
  node:HTMLSelectElement;

  disableOption:BaseComponent;

  constructor(parentNode:HTMLElement, styles:string[]) {
    this.node = document.createElement('select');
    this.node.classList.add(...styles);
    if (parentNode) {
      parentNode.append(this.node);
    }
    this.disableOption = new BaseComponent(this.node, 'option', ['placeholder'], 'select game type');
    options.forEach((option) => {
      new BaseComponent(this.node, option.name, [],
        option.valueDifficulty).node.setAttribute(option.attrName, option.valueDifficulty);
    });
  }
}
