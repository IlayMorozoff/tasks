import { BaseComponent } from '../../base-component';
import './button-header-stop.scss';

export class ButtonHeaderStop extends BaseComponent {
  constructor(parentNode:HTMLElement) {
    super(parentNode, 'button', ['header__button-stop', 'button', 'hidden'], 'stop game');
  }

  show():void {
    this.node.classList.remove('hidden');
  }

  hide():void {
    this.node.classList.add('hidden');
  }
}
