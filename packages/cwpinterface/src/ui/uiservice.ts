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
}
