import { atom } from "recoil";
import {PhotosData} from './Data'

export const _Photos = atom({
    key: "_Photos",
    default: PhotosData,
  });
  
