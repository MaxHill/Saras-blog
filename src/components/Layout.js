import React from "react";
import { Helmet } from "react-helmet";
import Footer from "../components/Footer";
import useSiteMetadata from "./SiteMetadata";
import { withPrefix } from "gatsby";
import { createGlobalStyle } from "styled-components";
import { Normalize } from "styled-normalize";
import colors from "../styles/colors";

const GlobalStyle = createGlobalStyle`
 html {
   box-sizing: border-box;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    font-family: 'Raleway', sans-serif;
    color: ${colors.text}
  }

  h1,h2,h3,h4,h5,h6 {
    font-weight: 600;
    font-family: 'Roboto Slab', serif;
    letter-spacing: .1rem;
  }

  p {
    line-height: 1.7;
    letter-spacing: .05rem;
  }
`;

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata();
  return (
    <>
      <Normalize />
      <GlobalStyle />
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix("/")}img/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix("/")}img/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix("/")}img/favicon-16x16.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix("/")}img/safari-pinned-tab.svg`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix("/")}img/og-image.jpg`}
        />
      </Helmet>
      {children}
      <Footer />
    </>
  );
};

export default TemplateWrapper;
