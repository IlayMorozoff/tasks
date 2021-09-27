/* eslint-disable @typescript-eslint/no-inferrable-types */
import { BaseComponent } from '../base-component';
import { Signal } from '../signal/signal';
import { Input } from './input';

export class InputWrapper extends BaseComponent {
  name: string;

  field: Input;

  error: BaseComponent;

  caption: BaseComponent;

  onValidate:(param: string) => string | null;

  inputValue: string;

  value: string;

  isValid:boolean = false;

  onValidStateChange: Signal<boolean> = new Signal();

  constructor(parentNode: HTMLElement, content = '', onValidate:(param: string) => string | null) {
    super(parentNode, 'div', ['input-wrapper']);
    this.caption = new BaseComponent(this.node, 'div', ['caption']);
    this.field = new Input(this.node, ['input']);
    this.error = new BaseComponent(this.node, 'div', ['input-error']);
    this.caption.node.textContent = content;
    this.onValidate = onValidate;
    this.field.node.oninput = () => {
      if (this.onValidate) {
        this.setError(this.onValidate(this.getValue()));
      }
    };
  }

  getValue():string {
    return this.field.node.value;
  }

  setError(err: string | null):void {
    if (err === null) {
      this.setValidState(true);
      this.error.node.textContent = 'successful data entry';
      this.field.node.classList.remove('invalid');
      this.field.node.classList.add('valid');
    } else {
      this.setValidState(false);
      this.error.node.textContent = err;
      this.field.node.classList.add('invalid');
      this.field.node.classList.remove('valid');
    }
  }

  resetInput():void {
    this.field.node.value = '';
    this.field.node.classList.remove('valid');
    this.field.node.classList.remove('invalid');
    this.error.node.textContent = '';
  }

  setValidState(state:boolean):void {
    this.isValid = state;
    this.onValidStateChange.emit(state);
  }
}
