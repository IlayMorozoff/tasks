import { Header } from './components/header/header';
import { Main } from './components/main/main';
import { Router } from './components/main/router/router';
import { pages } from './components/variables';

export class App {
  private header: Header;

  private main: Main;

  router: Router;

  constructor(readonly rootElement:HTMLElement) {
    this.header = new Header(rootElement);

    this.main = new Main(rootElement, this.header.headerAvatar, this.header.buttonStart, this.header.buttonHeaderReg);

    this.router = new Router(this.header.navigation.node, pages,
      this.main, this.header.buttonStart, this.header.buttonHeaderStop, this.header.buttonHeaderReg);

    this.router.addNavItem();

    this.header.onShowPopup = () => {
      this.main.showRegForm();
    };

    this.main.game.onShowScorePage = () => {
      this.header.buttonHeaderStop.hide()
      this.header.buttonStart.show();
      this.main.hideCardsField();
      this.router.showScore();
    };

    this.router.onHideGame = () => {
      this.main.hideCardsField();
    };

    this.router.onStartGame = () => {
      this.header.buttonHeaderStop.show();
      this.header.buttonStart.hide();
      this.main.showGameField();
      this.main.start(this.router.settings);
      this.main.game.blockGame();
    };

    this.header.hideGame = () => {
      this.main.hideCardsField();
    };

    this.router.changeHash();

    this.header.onBtnStop = () => {
      this.main.game.hideGame();
      this.router.showAboutGame();
      this.header.buttonHeaderStop.hide();
      this.header.buttonStart.show();
      this.main.game.cardsField.clear();
      this.main.game.removeBlockGame();
    };

    this.header.onLogoClick = () => {
      this.router.showAboutGame();
      this.main.game.hideGame();
      this.header.buttonHeaderStop.hide();
      this.router.showStart();
      this.main.game.removeBlockGame();
    }
  }
}
