import { ImageCategoryModel } from '../../models/image-category-model';
import { BaseComponent } from '../base-component';
import { ButtonHeaderReg } from '../header/button-header-register/button-header-register';
import { ButtonHeaderStart } from '../header/button-header-start/button-header-start';
import { HeaderAvatar } from '../header/header-avatar/header-avatar';
import { RegForm } from '../reg-form/reg-form';
import { Game } from './game/game';
import './main.scss';
import { Settings } from './settings-game/settings';

export class Main extends BaseComponent {
  public regForm: RegForm;

  public game: Game;

  public difficulty: string;

  public typeOfCards: string;

  avatar: HeaderAvatar;

  private btnStart: ButtonHeaderStart;

  private btnReg: ButtonHeaderReg;

  constructor(parentNode:HTMLElement, avatar: HeaderAvatar, btnStart: ButtonHeaderStart, btnReg: ButtonHeaderReg) {
    super(parentNode, 'main', ['main']);
    this.game = new Game(this.node);
    this.avatar = avatar;
    this.btnStart = btnStart;
    this.btnReg = btnReg;
    this.regForm = new RegForm(this.node, this.avatar, this.btnStart, this.btnReg);
  }

  showRegForm():void {
    this.regForm.node.classList.remove('hidden');
  }

  async start(settingsPage: Settings):Promise<void> {
    this.difficulty = settingsPage.getDifficulty();
    this.typeOfCards = settingsPage.getTypeOfCards();
    const res = await fetch(`./public/${this.typeOfCards}.json`);
    const categories: ImageCategoryModel[] = await res.json();
    const index = categories.findIndex((item) => item.category === this.difficulty);
    const images = categories[index].images.map((name) => `./public/card-image/${this.typeOfCards}/${name}`);
    this.game.newGame(images, this.difficulty);
  }

  hideCardsField(): void {
    this.game.hideGame();
  }

  showGameField(): void {
    this.game.node.style.display = 'block';
  }
}
