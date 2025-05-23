import { TypeEnum } from "../../enums";

export interface MultimediaResponse {
  id: number;
  name: string;
  url: string;
  duration: number;
  type: TypeEnum;
}