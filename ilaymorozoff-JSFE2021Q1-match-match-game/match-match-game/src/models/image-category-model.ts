import { BaseComponent } from "../components/base-component";
import { BaseLink } from "../components/navigation/base-link/base-link";

export interface ImageCategoryModel {
  category: string,
  images: string[];
}

export interface IPage {
  name:string,
  component: typeof BaseComponent,
  linkNav: typeof BaseLink
}
