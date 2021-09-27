import { BaseComponent } from '../../base-component';
import { iDB } from '../../indexedDB/idb';
import { ScoreItem } from './score-item';

export class Score extends BaseComponent {
  constructor(parentNode:HTMLElement) {
    super(parentNode, 'div', ['score'], 'Best Score');
  }

  showScore():void {
    this.node.innerHTML = 'Best Players';
    iDB.init('IlayMorozoff').then(() => iDB.readFiltered('collectionOfUsers')).then((users) => {
      users.forEach((user) => {
        if (user) {
          new ScoreItem(this.node, user.avatarLink, user.firstName, user.lastName, user.email, `${user.score}`);
        }
      });
    });
  }
}
