import { IPage } from '../../../models/image-category-model';
import { ButtonHeaderReg } from '../../header/button-header-register/button-header-register';
import { ButtonHeaderStart } from '../../header/button-header-start/button-header-start';
import { ButtonHeaderStop } from '../../header/button-header-stop/button-stop';
import { IPageMain } from '../../interfaces';
import { BaseLink } from '../../navigation/base-link/base-link';
import { Main } from '../main';
import { Score } from '../score/score';
import { Settings } from '../settings-game/settings';

export class Router {
  pageRender:Array<IPageMain>;

  arrLinks:Array<BaseLink>;

  settings: Settings;

  scorePage: Score;

  onStartGame: () => void;

  onHideGame: () => void;

  onBtnStop: () => void;

  constructor(public navContainer: HTMLElement, public pages:Array<IPage>,
    public main:Main, public buttonStart: ButtonHeaderStart, public btnStop: ButtonHeaderStop, public btnReg: ButtonHeaderReg) {
    this.navContainer = navContainer;
    this.pages = pages;
    this.main = main;
    this.btnStop = btnStop;

    this.pageRender = pages.map((page) => ({ name: page.name, instance: new page.component(this.main.node) }));

    this.settings = this.pageRender.find((page) => page.name === 'settings').instance as Settings;

    this.scorePage = this.pageRender.find((page) => page.name === 'score').instance as Score;

    this.buttonStart = buttonStart;
    this.buttonStart.node.onclick = () => {
      this.onStartGame();
    };
    this.arrLinks = [];
    window.onpopstate = () => this.changeHash();
  }

  changeHash():void {
    const currentRouteName = window.location.hash.slice(1);

    if (currentRouteName === 'game') {
      this.pageRender.forEach((page):string => page.instance.node.style.display = 'none');
    }
    if (currentRouteName === '') {
      this.pageRender.forEach((page):string => (page.instance.node.style.display) = (page.name === 'about') ? ('') : 'none');
    }

    if (currentRouteName === 'score') {
      this.scorePage.showScore();
    }

    this.pageRender.forEach((page):string => (page.instance.node.style.display) = (page.name === currentRouteName) ? ('') : 'none');
    this.arrLinks.forEach((item) => item.setInactive());

    if (currentRouteName === 'about') {
      this.main.game.removeBlockGame();
      this.btnStop.hide();
      this.showStart();
      this.arrLinks[0].setActive();
    } else if (currentRouteName === 'score') {
      this.main.game.removeBlockGame();
      this.btnStop.hide();
      this.showStart();
      this.arrLinks[1].setActive();
    } else if (currentRouteName === 'settings') {
      this.main.game.removeBlockGame();
      this.btnStop.hide();
      this.showStart();
      this.arrLinks[2].setActive();
    } else if (currentRouteName === '') {
      this.btnStop.hide();
      this.showStart();
      this.arrLinks[0].setActive();
    }
  }

  addNavItem():void {
    this.pages.map((page) => {
      const navItem = new page.linkNav(this.navContainer);
      this.arrLinks.push(navItem);

      navItem.node.onclick = () => {
        this.onHideGame();
      };
    });
  }

  showScore():void {
    window.location.hash = `#${this.pages[1].name}`;
  }

  showAboutGame():void {
    window.location.hash = `#${this.pages[0].name}`;
    this.pageRender.forEach((page):string => (page.instance.node.style.display) = (page.name === 'about') ? ('') : 'none');
  }

  showStart() {
    if (this.btnReg.node.classList.contains('hidden')) {
      this.buttonStart.show();
    }
  }
}
