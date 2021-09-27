import { BaseComponent } from '../../base-component';
import './timer.scss'

export class Timer extends BaseComponent {
  timer: number;

  milliseconds: number;

  currentTime: number;

  constructor(parentNode:HTMLElement) {
    super(parentNode, 'div', ['timer-wrapper']);
    this.currentTime = 0;
  }

  startTimer = ():void => {
    this.milliseconds = 0;
    this.timer = window.setInterval(() => {
      this.milliseconds += 1000
      const time = new Date(this.milliseconds);
      this.node.textContent= `
      ${('0'+time.getUTCHours()).slice(-2) + ' : ' +
        ('0'+time.getUTCMinutes()).slice(-2) + ' : ' +
        ('0'+time.getUTCSeconds()).slice(-2)}
      `
    }, 1000)
  };

  stopTimer = ():void => {
    clearInterval(this.timer);
  }

  resetTimer = ():void => {
    this.stopTimer();
    clearInterval(this.timer);
    this.milliseconds = 0;
    this.node.innerHTML = '00 : 00 : 00';
  }

  setTime():void {
    this.currentTime = new Date().getTime()
  }

  getTime():number {
    return new Date().getTime() - this.currentTime
  }
};
