import { BaseComponent } from '../../base-component';
import './header-avatar.scss';

export class HeaderAvatar extends BaseComponent {
  constructor(parentNode:HTMLElement, valueOfAttributeSrc = '', valueOfAttributeAlt = '', styles:string[] = []) {
    super(parentNode, 'img', styles);
    this.node.setAttribute('src', valueOfAttributeSrc);
    this.node.setAttribute('alt', valueOfAttributeAlt);
    this.node.classList.add(...styles);
  }

  show():void {
    this.node.classList.remove('hidden');
  }

  hide():void {
    this.node.classList.add('hidden');
  }
}
