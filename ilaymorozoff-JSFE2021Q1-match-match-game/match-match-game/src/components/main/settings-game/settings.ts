import { BaseComponent } from '../../base-component';
import { Difficulty } from './difficulty';
import { SelectTypeCards } from './type-cards';


export class Settings extends BaseComponent {
  selectTypeCards: SelectTypeCards;

  captionTypeCards: BaseComponent;

  difficulty:Difficulty;

  captionDifficulty:BaseComponent;

  constructor(parentNode:HTMLElement) {
    super(parentNode, 'div', ['settings']);
    this.captionTypeCards = new BaseComponent(this.node, 'div', ['caption-type-cards'], 'Game cards');
    this.selectTypeCards = new SelectTypeCards(this.node, ['select-type-cards']);
    this.captionTypeCards = new BaseComponent(this.node, 'div', ['caption-difficulty'], 'Difficulty');
    this.difficulty = new Difficulty(this.node, ['select-difficulty']);
  }

  getTypeOfCards():string {
    if (this.selectTypeCards.node.value !== 'hawaii' && this.selectTypeCards.node.value !== 'dogs' && this.selectTypeCards.node.value !== 'wildlife') {
      return 'hawaii';
    }
    return this.selectTypeCards.node.value;
  }

  getDifficulty():string {
    if (this.difficulty.node.value !== 'easy' && this.difficulty.node.value !== 'medium' && this.difficulty.node.value !== 'hard') {
      return 'easy';
    }
    return this.difficulty.node.value;
  }
}
