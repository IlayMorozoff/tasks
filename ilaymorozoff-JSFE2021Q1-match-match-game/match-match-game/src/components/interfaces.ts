import { BaseComponent } from "./base-component";

export interface IPageMain {
  name:string;
  instance: BaseComponent;
}

export interface ILink {
  name: string;
  linkNav: typeof BaseComponent;
}
export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  score: number;
  avatarLink?: string;
  id?: IDBValidKey;
}

export interface InputConf {
  name: string;
  messageError: string;
}
