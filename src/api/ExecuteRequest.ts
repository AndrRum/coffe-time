import axios from "axios";
import {IRequestConfig} from "./AuthUser";

export const execRequest = (config: IRequestConfig): Promise<any | null> => {
  return new Promise((resolve, reject) => {
    axios.request(config).then(resolve).catch(reject);
  });
};
