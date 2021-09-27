import { BaseComponent } from '../../base-component';
import { pageNavigation } from '../../variables';
import { BaseLink } from '../base-link/base-link';
import './best-score.scss';

export class BestScoreNav extends BaseLink {
  public navIcon:BaseComponent;

  public containerTextNavIcon:BaseComponent;

  public containerContainer:BaseComponent;

  constructor(parentNode:HTMLElement) {
    super(parentNode);
    this.node.classList.add('header__best-score');
    this.node.setAttribute('href', pageNavigation[1].href);
    this.navIcon.node.classList.add('header__best-score-icon');
    this.containerTextNavIcon = new BaseComponent(this.node, 'a', ['nav-text'], pageNavigation[1].name);
  }
}
