import { BaseComponent } from '../base-component';
import { HeaderAvatar } from '../header/header-avatar/header-avatar';
import { Input } from './input';

export class ImageLoader extends BaseComponent {
  label: BaseComponent;

  loader: Input;

  headerAvatar: HeaderAvatar;

  constructor(parentNode: HTMLElement, avatar: HeaderAvatar) {
    super(parentNode, 'div', ['image-loader-wrapper']);
    this.headerAvatar = avatar;
    this.label = new BaseComponent(this.node, 'label', ['label-img-loader']);
    this.label.node.setAttribute('for', 'file-loader');
    this.loader = new Input(this.label.node, ['image-loader'], 'file');
    this.loader.node.setAttribute('type', 'file');
    this.loader.node.setAttribute('id', 'file-loader');
    this.loader.node.onchange = () => this.setAvatar().then((result) => {

      this.label.node.style.backgroundImage = `url('${result}')`;
      this.headerAvatar.node.setAttribute('src', `${result}`);
    });
  }

  setAvatar() {
    return new Promise((resolve) => {
      const file = this.loader.node.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          localStorage.setItem('currentLinkAvatar', (reader.result).toString());
          resolve(reader.result);
        }
      };
    })
  }
}
