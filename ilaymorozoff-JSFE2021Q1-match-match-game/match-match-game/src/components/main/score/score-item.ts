import { BaseComponent } from '../../base-component';
import './score-item.scss';
import defaultAv from '../../../assets/images/avat-def.png';

export class ScoreItem extends BaseComponent {
  private avatar: BaseComponent;

  private firstName: BaseComponent;

  private email: BaseComponent;

  private score: BaseComponent;

  private wrapperItem: BaseComponent;

  constructor(parentNode: HTMLElement, src = '', firstName = '', lastName = '', email = '', score = '') {
    super(parentNode, 'div', ['score-item']);
    this.wrapperItem = new BaseComponent(this.node, 'div', ['wrapper-item']);
    this.avatar = new BaseComponent(this.wrapperItem.node, 'img', ['img-score']);
    this.avatar.node.setAttribute('src', src || defaultAv);
    this.firstName = new BaseComponent(this.wrapperItem.node, 'div', ['first-last-name-score']);
    this.firstName.node.textContent = `${firstName} ${lastName}`;
    this.email = new BaseComponent(this.wrapperItem.node, 'div', ['email-score']);
    this.email.node.textContent = email;
    this.score = new BaseComponent(this.node, 'div', ['score-score']);
    this.score.node.textContent = `Score: ${score}`;
  }
}
