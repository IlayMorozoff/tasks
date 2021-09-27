import { BaseComponent } from '../../base-component';
import './settings.scss';
import { options } from '../../variables'

export class SelectTypeCards {
  node:HTMLSelectElement;

  disableOption:BaseComponent

  constructor(parentNode:HTMLElement, styles:string[]) {

    this.node = document.createElement('select');
    this.node.classList.add(...styles);
    if (parentNode) {
      parentNode.append(this.node);
    }
    this.disableOption = new BaseComponent(this.node, 'option', ['placeholder'], 'select game cards type')
    options.forEach((option) => {
      new BaseComponent(this.node, option.name, [], option.valueTypeCards).node.setAttribute(option.attrName, option.valueTypeCards);
    });
  }
}
