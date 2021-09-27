import { Card } from '../main/card/card';

export const randomSort = (arr:Array<Card>):Card[] => {
  for (let i = arr.length - 1; i > 0; i--) {
    const tmp = arr[i];
    const randomNum = Math.floor(Math.random() * (i + 1));

    arr[i] = arr[randomNum];
    arr[randomNum] = tmp;
  }
  return arr;
};
