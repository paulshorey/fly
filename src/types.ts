export interface options {
  [key : string] : boolean;
}

export interface message {
  action?: "get" | "set",
  key: string,
  value: boolean
}

export const defaultOptions = {
  _modifyHost: true,
  _google50Results: true,
  _googleNewTab: true,
  _hidePopupsAndAds: true
}