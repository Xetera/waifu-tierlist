import App, { AppProps, Container } from "next/app";
// @ts-ignore
import withGA from "next-ga";
import * as React from "react";
import Router from "next/router";

class WaifuTierlist extends App {
  static async getInitialProps({ Component, ctx }: AppProps & { ctx: any }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default withGA("UA-133545986-5", Router)(WaifuTierlist);
