export { default as PageWrapper } from "./PageWrapper/PageWrapper";
export { default as Head } from "./Head/Head";

export interface HeadProps {
  readonly title?: string;
  readonly image?: string;
  readonly url?: string;
  readonly description?: string;
}
