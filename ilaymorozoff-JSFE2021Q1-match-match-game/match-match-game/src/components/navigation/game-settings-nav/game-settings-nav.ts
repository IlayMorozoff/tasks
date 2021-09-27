import { BaseComponent } from '../../base-component';
import { pageNavigation } from '../../variables';
import { BaseLink } from '../base-link/base-link';
import './game-settings-nav.scss';

export class GameSettingsNav extends BaseLink {
  public navIcon:BaseComponent;

  public containerTextNavIcon:BaseComponent;

  public containerContainer:BaseComponent;

  constructor(parentNode:HTMLElement) {
    super(parentNode);
    this.node.classList.add('header__game-settings');
    this.node.setAttribute('href', pageNavigation[2].href);
    this.navIcon.node.classList.add('header__settings-icon');
    this.containerTextNavIcon = new BaseComponent(this.node, 'a', ['nav-text'], pageNavigation[2].name);
  }
}
