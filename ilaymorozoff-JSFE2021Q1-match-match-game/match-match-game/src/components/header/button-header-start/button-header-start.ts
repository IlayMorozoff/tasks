import { BaseComponent } from '../../base-component';
import { pageNavigation } from '../../variables';
import './button-header-start.scss';

export class ButtonHeaderStart extends BaseComponent {
  constructor(parentNode:HTMLElement) {
    super(parentNode, 'a', ['header__button-start', 'button', 'hidden'], 'start game');
    this.node.setAttribute('href', pageNavigation[3].href);
  }

  show():void {
    this.node.classList.remove('hidden');
  }

  hide():void {
    this.node.classList.add('hidden');
  }
}
