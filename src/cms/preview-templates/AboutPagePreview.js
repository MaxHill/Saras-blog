import React from "react";
import PropTypes from "prop-types";
import { AboutPageTemplate } from "../../templates/about-page";
import GlobalStyle from "../../styles/GlobalStyle";
import { Normalize } from "styled-normalize";

const AboutPagePreview = ({ entry, widgetFor }) => (
  <>
    <Normalize />
    <GlobalStyle />
    <AboutPageTemplate
      title={entry.getIn(["data", "title"])}
      content={widgetFor("body")}
    />
  </>
);

AboutPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
};

export default AboutPagePreview;
