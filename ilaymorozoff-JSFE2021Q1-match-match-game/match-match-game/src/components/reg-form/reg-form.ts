import { BaseComponent } from '../base-component';
import { ImageLoader } from './image-loader';
import { InputWrapper } from './input-wrapper';
import './reg-form.scss';
import '../header/variables/variables.scss';
import { inputConfig, regexFirstLastName, regexEmail } from '../variables';
import { HeaderAvatar } from '../header/header-avatar/header-avatar';
import { iDB } from '../indexedDB/idb';
import { IUser } from '../interfaces';
import { ButtonHeaderStart } from '../header/button-header-start/button-header-start';
import { ButtonHeaderReg } from '../header/button-header-register/button-header-register';
import defaultAvatar from '../../assets/images/main-about-game/avatar-default.png';

export class RegForm extends BaseComponent {
  private formWrapper: BaseComponent | HTMLFontElement;

  private addUserBtn: BaseComponent;

  private cancelBtn: BaseComponent;

  private imageLoader: ImageLoader;

  private title: BaseComponent;

  private inputWrapperGroup: BaseComponent;

  private avatar: HeaderAvatar;

  public inputs: InputWrapper[];

  constructor(parentNode: HTMLElement, avatar?: HeaderAvatar, btnStart?: ButtonHeaderStart, btnReg?: ButtonHeaderReg) {
    super(parentNode, 'div', ['reg-form-wrapper', 'hidden']);
    this.avatar = avatar;
    this.formWrapper = new BaseComponent(this.node, 'div', ['form']);
    this.title = new BaseComponent(this.formWrapper.node, 'div', ['title-form'], 'Register new Player');
    this.inputWrapperGroup = new BaseComponent(this.formWrapper.node, 'div', ['input-wrapper-group']);
    this.inputs = [
      new InputWrapper(
        this.inputWrapperGroup.node, inputConfig[0].name, (value) =>
          (value.match(regexFirstLastName) ? null : inputConfig[0].messageError)
      ),
      new InputWrapper(
        this.inputWrapperGroup.node, inputConfig[1].name, (value) =>
          (value.match(regexFirstLastName) ? null : inputConfig[1].messageError)
      ),
      new InputWrapper(this.inputWrapperGroup.node, inputConfig[2].name, (value) => (value.match(regexEmail) ? null : inputConfig[2].messageError)),
    ];
    this.inputs.forEach((input) => input.onValidStateChange.add(() => this.checkValidateForm()));
    this.imageLoader = new ImageLoader(this.formWrapper.node, this.avatar);
    this.addUserBtn = new BaseComponent(
      this.formWrapper.node, 'button', ['add-user-btn', 'button'], 'Add User',
    );
    this.addUserBtn.node.setAttribute('disabled', 'true');
    this.addUserBtn.node.onclick = async () => {
      btnStart.show();
      btnReg.hide();
      this.hide();
      this.avatar.show();
      localStorage.setItem('currentFirstName', this.inputs[0].getValue());
      localStorage.setItem('currentLastName', this.inputs[1].getValue());
      localStorage.setItem('currentEmail', this.inputs[2].getValue());
      const currentLinkAvatar = localStorage.getItem('currentLinkAvatar');

      iDB.init('IlayMorozoff').then(async () => {
        await iDB.write<IUser>('collectionOfUsers', {
          firstName: this.inputs[0].getValue(),
          lastName: this.inputs[1].getValue(),
          email: this.inputs[2].getValue(),
          score: 0,
          avatarLink: currentLinkAvatar,
        }, this.inputs[2].getValue());
      });
    };
    this.cancelBtn = new BaseComponent(this.formWrapper.node, 'button', ['add-user-btn', 'button'], 'Cancel');
    this.cancelBtn.node.onclick = () => {
      this.resetPopUp();
    };
  }

  resetPopUp(): void {
    this.inputs.forEach((input) => input.resetInput())
    this.node.classList.add('hidden');
    this.imageLoader.label.node.style.backgroundImage = `url(${defaultAvatar})`;
  }

  checkValidateForm(): void {
    const valid = this.inputs.every((input) => input.isValid);
    if (valid) {
      this.addUserBtn.node.removeAttribute('disabled');
    } else {
      this.addUserBtn.node.setAttribute('disabled', 'true');
    }
  }

  hide():void {
    this.node.classList.add('hidden');
  }
}
