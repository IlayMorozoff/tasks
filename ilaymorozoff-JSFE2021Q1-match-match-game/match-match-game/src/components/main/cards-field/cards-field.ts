import './cards-field.scss';
import { BaseComponent } from '../../base-component';
import { Card } from '../card/card';
import { SHOW_TIME } from '../../variables';

export class CardsField extends BaseComponent {
  public cards: Card[] = [];

  constructor(parentNode:HTMLElement) {
    super(parentNode, 'div', ['cards-field']);
  }

  clear():void {
    this.cards = [];
    this.node.innerHTML = '';
  }

  addCards(cards: Card[]):void {
    this.cards = cards;
    this.cards.forEach((card) => this.node.appendChild(card.node));
    setTimeout(() => {
      this.cards.forEach((card) => card.flipToBack());
    }, SHOW_TIME * 1000);
  }
}
