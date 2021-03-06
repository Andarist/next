// @flow
export type CSSCache = { [string]: string }

export type InsertedCache = { [string]: string | true }

interface StyleSheet {
  insert(rule: string): void;
  flush(): void;
}

export type CSSContextType = {
  stylis: (string, string) => Array<string>,
  inserted: InsertedCache,
  registered: CSSCache,
  sheet: StyleSheet,
  theme: Object
}

export type Interpolation = any

export type ScopedInsertableStyles = {
  name: string,
  styles: string,
  type: 1,
  cls: string
}
export type KeyframesInsertableStyles = {
  name: string,
  styles: string,
  type: 2
}

export type InsertableStyles =
  | ScopedInsertableStyles
  | KeyframesInsertableStyles

export const SCOPED_TYPE = 1
export const KEYFRAMES_TYPE = 2
