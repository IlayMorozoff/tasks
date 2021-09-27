import { BaseComponent } from '../../base-component';
import './card.scss';

const FLIP_CLASS = 'flipped';

export class Card extends BaseComponent {
  isFlipped = false;

  constructor(parentNode:HTMLElement, readonly image: string, difficulty: string) {
    super(parentNode, 'div', [`card-container__${difficulty}`, 'card-container']);

    this.node.innerHTML = `
      <div class="card">
        <div class="card__front" style="background-image: url('${image}')"></div>
        <div class="card__back"></div>
      </div>`;
  }

  flipToBack():Promise<void> {
    this.isFlipped = false;
    return this.flip(true);
  }

  flipToFront():Promise<void> {
    this.isFlipped = true;
    return this.flip();
  }

  private flip(isFront = false):Promise<void> {
    return new Promise((resolve) => {
      this.node.classList.toggle(FLIP_CLASS, isFront);
      this.node.addEventListener('transitionend', () => resolve(), { once: true });
    });
  }

  showErrorState():Promise<void> {
    return new Promise((resolve) => {
      this.node.classList.add('error');
      resolve();
    });
  }

  removeErrorState():Promise<void> {
    return new Promise((resolve) => {
      this.node.classList.remove('error');
      resolve();
    });
  }

  showCompleteState():Promise<void> {
    return new Promise((resolve) => {
      this.node.classList.add('complete');
      resolve();
    });
  }
}
