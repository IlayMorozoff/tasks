import { BaseComponent } from '../base-component';
import { Navigation } from '../navigation/navigation';
import { ButtonHeaderReg } from './button-header-register/button-header-register';
import { ButtonHeaderStart } from './button-header-start/button-header-start';
import { HeaderAvatar } from './header-avatar/header-avatar';
import img from '../../assets/images/avatar-template.png';
import './header.scss';
import { ButtonHeaderStop } from './button-header-stop/button-stop';

export class Header extends BaseComponent {
  private wrapperHeaderMain: BaseComponent;

  private logo:BaseComponent;

  public navigation: Navigation;

  private mainWrapperContent: BaseComponent;

  public buttonHeaderReg: ButtonHeaderReg;

  public buttonStart: ButtonHeaderStart;

  public buttonHeaderStop: ButtonHeaderStop;

  public headerAvatar: HeaderAvatar;

  onShowPopup: () => void;

  onStartGame: () => void;

  hideGame: () => void;

  onBtnStop: () => void;

  onLogoClick: () => void;

  constructor(parentNode:HTMLElement) {
    super(parentNode, 'header', ['header']);

    this.wrapperHeaderMain = new BaseComponent(this.node, 'div', ['header__wrapper']);
    this.logo = new BaseComponent(this.wrapperHeaderMain.node, 'a', ['header__logo'], '');
    this.logo.node.setAttribute('href', '#about')
    this.logo.node.onclick = () => {
      this.onLogoClick();
    }
    this.mainWrapperContent = new BaseComponent(this.wrapperHeaderMain.node, 'div', ['wrapper__content']);
    this.navigation = new Navigation(this.mainWrapperContent.node);
    this.buttonHeaderReg = new ButtonHeaderReg(this.wrapperHeaderMain.node);

    this.buttonStart = new ButtonHeaderStart(this.wrapperHeaderMain.node);

    this.buttonStart.node.onclick = () => {
      this.onStartGame();
    };

    this.buttonHeaderStop = new ButtonHeaderStop(this.wrapperHeaderMain.node);
    this.headerAvatar = new HeaderAvatar(this.wrapperHeaderMain.node, img, 'your avatar', ['header__avatar', 'hidden']);

    this.buttonHeaderReg.node.onclick = () => {
      localStorage.clear();
      this.onShowPopup();
    };

    this.buttonHeaderStop.node.onclick = () => {
      this.onBtnStop();
    };
  }
}
