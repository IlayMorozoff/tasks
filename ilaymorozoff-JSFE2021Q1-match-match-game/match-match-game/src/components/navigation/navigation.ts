import { BaseComponent } from '../base-component';
import './nav.scss';

export class Navigation extends BaseComponent {
  constructor(parentNode:HTMLElement) {
    super(parentNode, 'nav', ['header__navigation']);
  }
}
