export interface ToastMessageConfig {
  allowClose?: boolean;
  autoCloseTime?: number;
  iconName?: string;
  source?: string;
  triggerId: string;
  open: boolean;
}

export enum UISize {
  small,
  medium,
  large,
  xlarge,
}

export enum UILevel {
  info,
  warning,
  error,
}

export interface ModalConfig {
  size: UISize;
  closeButton?: boolean;
  iconLevel?: UILevel;
  source?: string;
  triggerId: string;
  open: boolean;
}
export interface ModalObject {
  header: any;
  content: any;
  footer: any;
  config: ModalConfig;
}
export interface LoaderConfig {
  size: UISize;
  customText?: string;
  showPercentage?: boolean;
  percentageValue?: string;
  source: string;
  triggerId: string;
  open: boolean;
}

export interface AnnounceConfig {
  timeout?: number;
  allowClose: boolean;
  msgLevel?: UILevel;
  source?: string;
  triggerId: string;
  open:boolean;
}

export const CWP_MODAL_SUBJECT = 'CWP_MODAL_SUBJECT';
export const CWP_LOADER_SUBJECT = 'CWP_LOADER_SUBJECT';
export const CWP_MESSAGE_SUBJECT = 'CWP_MESSAGE_SUBJECT';
export const CWP_ANNOUNCEMENT_SUBJECT='CWP_ANNOUNCEMENT_SUBJECT';