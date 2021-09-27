import { BaseComponent } from '../../base-component';
import './winpopup.scss';

export class WinPopup extends BaseComponent {
  text:BaseComponent;

  wrapperWinPopup: BaseComponent;

  button: BaseComponent;

  onCloseWinPopup: () => void;

  constructor(parentNode:HTMLElement) {
    super(parentNode, 'div', ['win-popup', 'hidden']);
    this.wrapperWinPopup = new BaseComponent(this.node, 'div', ['wrapper-winpopup']);
    this.text = new BaseComponent(this.wrapperWinPopup.node, 'div', ['text-winpopup']);
    this.button = new BaseComponent(this.wrapperWinPopup.node, 'button', ['button-winpopup', 'button'], 'Ok');
    this.button.node.onclick = () => {
      this.onCloseWinPopup();
      this.node.classList.add('hidden');
    };
  }

  show(score: number):void {
    this.node.classList.remove('hidden');
    if (score <= 0) {
      this.text.node.textContent = 'Unfortunately you got 0 points, try again!';
    } else {
      this.text.node.textContent = `Congratulations! You successfully found all matches and got ${score} points`;
    }
  }
}
