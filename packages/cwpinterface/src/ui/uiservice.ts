import {
  AnnounceConfig,
  LoaderConfig,
  ModalObject,
  ToastMessageConfig,
} from "./configs";

export interface CwpUIService {
  renderToastMessage: (
    msg: string,
    toastMessageConfig: ToastMessageConfig
  ) => void;
  closeToastMessage: (triggerId: string)=> void;
  renderModal: (modalObject: ModalObject) => void;
  closeModal: (triggerId: string)=> void;
  renderLoader: (loadConfig: LoaderConfig) => void;
  closeLoader: (triggerId: string)=> void;
  renderAnnouncement: (msg: string, announceConfig: AnnounceConfig) => void;
  closeAnnouncement: (triggerId: string)=> void;
  lock: UILock;
}

export interface UILock  {
  request(triggerId: string, canUnlock: ()=>boolean, accept: ()=> void ):void;
  release(triggerId: string): void;
  unlock(triggerId: string): boolean;
  accept(triggerId: string):void;
}