import { TypeEnum } from "../../enums";

export interface CreateMultimediaRequest {
  name: string;
  url: string;
  duration: number;
  type: TypeEnum;
}
