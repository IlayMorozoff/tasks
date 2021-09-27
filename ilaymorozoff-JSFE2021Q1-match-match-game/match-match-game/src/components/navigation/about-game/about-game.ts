import { BaseComponent } from '../../base-component';
import './about-game.scss';
import { pageNavigation } from '../../variables';
import { BaseLink } from '../base-link/base-link';

export class AboutGameNav extends BaseLink {
  public navIcon:BaseComponent;

  public containerTextNavIcon:BaseComponent;

  public containerContainer:BaseComponent;

  constructor(parentNode:HTMLElement) {
    super(parentNode);
    this.node.classList.add('header__about-game');
    this.node.setAttribute('href', pageNavigation[0].href);
    this.navIcon.node.classList.add('header__about-game-icon');

    this.containerTextNavIcon = new BaseComponent(this.node, 'a', ['nav-text'], pageNavigation[0].name);
  }
}
