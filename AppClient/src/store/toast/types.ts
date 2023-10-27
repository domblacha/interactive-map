export interface ToastState {
  isOpen: boolean;
  message: string;
  variant: 'error' | 'warning' | 'info' | 'success';
}

export interface ToastShowAction {
  message: string | undefined;
  variant: 'error' | 'warning' | 'info' | 'success';
}
