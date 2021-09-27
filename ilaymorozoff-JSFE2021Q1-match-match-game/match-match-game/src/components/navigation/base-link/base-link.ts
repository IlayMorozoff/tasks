import { BaseComponent } from '../../base-component';

export class BaseLink extends BaseComponent {
  public navIcon:BaseComponent;

  public containerContainer:BaseComponent;

  constructor(parentNode:HTMLElement) {
    super(parentNode, 'a', ['nav-item'], '');
    this.navIcon = new BaseComponent(this.node, 'div', ['nav-icon']);
  }

  setActive():void {
    this.node.classList.add('active');
  }

  setInactive():void {
    this.node.classList.remove('active');
  }
}
