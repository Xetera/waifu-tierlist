import Document, { Main, NextScript, Head } from "next/document";
import { ServerStyleSheets } from "@material-ui/styles";
import * as React from "react";

class Html extends Document {
  render() {
    return (
      <html lang="en">
        <Head/>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
  static async getInitialProps(ctx: any) {
    // I have absolutely no idea what's going on here
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) => (props: any) =>
          sheets.collect(<App {...props} />)
      });

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: sheets.getStyleElement()
    };
  }
}

export default Html;
