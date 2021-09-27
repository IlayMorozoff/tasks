import { BaseComponent } from '../../base-component';
import './button-header-register.scss';

export class ButtonHeaderReg extends BaseComponent {
  onSelect:(a:number, b:number) => void;

  constructor(parentNode:HTMLElement) {
    super(parentNode, 'button', ['header__button-register', 'button'], 'register new player');
  }

  hide():void {
    this.node.classList.add('hidden');
  }

  show():void {
    this.node.classList.remove('hidden');
  }
}
