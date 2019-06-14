export { default as SearchResult } from "./SearchResult/SearchResult"
export { default as SearchBar } from "./SearchBar/SearchBar"
export { default as SavedLists } from "./SavedLists/SavedLists"
export { default as Home } from "./Home"

export interface Save {
  readonly name: string;
  readonly url: string;
  readonly image: string;
}
