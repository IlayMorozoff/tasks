import { BaseComponent } from '../../base-component';
import { HeaderAvatar } from '../../header/header-avatar/header-avatar';
import imageForm from '../../../assets/images/main-about-game/form.png';
import imageSettings from '../../../assets/images/main-about-game/game-settings.png';
import imageGame from '../../../assets/images/main-about-game/game-field.png';
import './wrapper-about-game.scss';

export class WrapperAboutGameMain extends BaseComponent {
  private title:BaseComponent;

  private stepOne:BaseComponent;

  private IconStepOne:BaseComponent;

  private stepTwo:BaseComponent;

  private imgForm: HeaderAvatar;

  private register:BaseComponent;

  private settings:BaseComponent;

  private IconStepTwo:BaseComponent;

  private imgSettings:HeaderAvatar;

  private stepThree:BaseComponent;

  private startGameinfo:BaseComponent;

  private IconStepThree:BaseComponent;

  private imgGame: HeaderAvatar;

  constructor(parentNode:HTMLElement) {
    super(parentNode, 'section', ['main__wrapper-about-game']);

    this.title = new BaseComponent(this.node, 'div', ['about-game__title'], 'How to play?');

    this.stepOne = new BaseComponent(this.node, 'div', ['about-game__step-one']);
    this.register = new BaseComponent(this.stepOne.node, 'div', ['about-game__reg'], 'Register new player in game');
    this.IconStepOne = new BaseComponent(this.register.node, 'div', ['about-game__icon'], '1');
    this.imgForm = new HeaderAvatar(this.stepOne.node, imageForm, 'example form', ['about-name__form-img']);

    this.stepTwo = new BaseComponent(this.node, 'div', ['about-game__step-two']);
    this.settings = new BaseComponent(this.stepTwo.node, 'div', ['about-game__settings'], 'Configure your game settings');
    this.IconStepTwo = new BaseComponent(this.settings.node, 'div', ['about-game__icon'], '2');
    this.imgSettings = new HeaderAvatar(this.stepTwo.node, imageSettings, 'settings icon', ['about-name__settings-img']);

    this.stepThree = new BaseComponent(this.node, 'div', ['about-game__step-three']);
    this.startGameinfo = new BaseComponent(this.stepThree.node, 'div', ['about-game__start-game'], 'Start you new game! Remember card positions and match it before times up.');
    this.IconStepThree = new BaseComponent(this.startGameinfo.node, 'div', ['about-game__icon'], '3');
    this.imgGame = new HeaderAvatar(this.stepThree.node, imageGame, 'settings icon', ['about-name__game-img']);
  }
}
