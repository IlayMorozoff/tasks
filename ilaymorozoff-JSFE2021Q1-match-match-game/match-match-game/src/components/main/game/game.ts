import { BaseComponent } from '../../base-component';
import { iDB } from '../../indexedDB/idb';
import { delay } from '../../shared/delay';
import { randomSort } from '../../shared/random-sort';
import { FLIP_DELAY, SHOW_TIME } from '../../variables';
import { Card } from '../card/card';
import { CardsField } from '../cards-field/cards-field';
import { Timer } from '../timer/timer';
import { WinPopup } from '../winPopUp/winpopup';

export class Game extends BaseComponent {
  cardsField: CardsField;

  private activeCard?: Card;

  private isAnimation = false;

  private timer: Timer;

  flippedCards: string[];

  fullCardsLength: number;

  comparisons: number;

  incorrectСomparisons: number;

  winPopup: WinPopup;

  onShowScorePage: () => void;

  blockContainer: BaseComponent;

  constructor(parentNode:HTMLElement) {
    super(parentNode, 'section', ['game']);
    this.timer = new Timer(this.node);
    this.cardsField = new CardsField(this.node);
    this.winPopup = new WinPopup(this.node);
    this.winPopup.onCloseWinPopup = () => {
      this.onShowScorePage();
    };

    this.comparisons = 0;
    this.incorrectСomparisons = 0;
    this.flippedCards = [];
  }

  blockGame() {
    this.blockContainer = new BaseComponent(this.node, 'div', ['block-game']);
  }

  removeBlockGame() {
    if(this.blockContainer) {
      this.blockContainer.node.remove();
    }
  }

  hideGame():void {
    this.node.style.display = 'none';
  }

  newGame(images: string[], difficulty: string):void {
    this.cardsField.clear();
    this.timer.resetTimer();
    setTimeout(() => {
      this.timer.setTime();
      this.timer.startTimer();
      this.removeBlockGame();
    }, SHOW_TIME * 1000);

    this.fullCardsLength = images.length;

    const cards = images
      .concat(images)
      .map((url) => new Card(this.node, url, difficulty));
    // eslint-disable-next-line no-return-assign
    cards.forEach((card) => card.node.onclick = () => this.cardHandler(card));
    this.cardsField.addCards(randomSort(cards));
  }

  private async cardHandler(card: Card) {
    if (this.isAnimation) return;
    if (card.isFlipped) return;
    this.isAnimation = true;

    await card.flipToFront();

    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }
    if (this.activeCard.image !== card.image) {
      this.comparisons += 1;
      this.incorrectСomparisons += 1;
      await Promise.all([this.activeCard.showErrorState(), card.showErrorState()]);
      await delay(FLIP_DELAY);
      await Promise.all([this.activeCard.removeErrorState(), card.removeErrorState()]);
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
    } else {
      await Promise.all([this.activeCard.showCompleteState(), card.showCompleteState()]);
      this.comparisons += 1;
      this.flippedCards.push(this.activeCard.image);
      this.winInGame();
    }
    this.activeCard = undefined;
    this.isAnimation = false;
  }

  winInGame():void {
    if (this.flippedCards.length === this.fullCardsLength) {
      this.timer.stopTimer();
      const score = ((this.comparisons - this.incorrectСomparisons) * 100) - Math.ceil(this.timer.getTime() / 100);
      this.flippedCards = [];
      this.comparisons = 0;
      this.incorrectСomparisons = 0;
      this.winPopup.show(score);
      const emailLS = localStorage.getItem('currentEmail');
      const firstNameLS = localStorage.getItem('currentFirstName');
      const lastNameLS = localStorage.getItem('currentLastName');
      const currentLinkAvatarLS = localStorage.getItem('currentLinkAvatar');
      if (score <= 0) {
        // localStorage.setItem('currentScore', '0');
      // const score = localStorage.getItem('currentScore')

        iDB.write('collectionOfUsers', {
          firstName: firstNameLS,
          lastName: lastNameLS,
          email: emailLS,
          score,
          avatarLink: currentLinkAvatarLS,
        }, emailLS);
      } else {
        iDB.write('collectionOfUsers', {
          firstName: firstNameLS,
          lastName: lastNameLS,
          email: emailLS,
          score,
          avatarLink: currentLinkAvatarLS,
        }, emailLS);
      }
    }
  }
}
