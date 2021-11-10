export interface options {
  [key : string] : boolean;
}

export interface message {
  action?: "get" | "set",
  key: string,
  value: boolean
}

export const defaultOptions = {
  _showBottomLeftButtons: true,
  _hidePopupsAndAds: true,
  _fixGooglePreferences: true
}