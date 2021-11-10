export interface options {
  [key : string] : boolean;
}

export interface message {
  action?: "get" | "set",
  key: string,
  value: boolean
}

export const defaultOptions = {
  SHOW_FLYSWATTER_ICON: true,
  HIDE_POPUPS_AND_ADS: true
}