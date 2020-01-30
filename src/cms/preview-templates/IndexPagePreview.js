import React from "react";
import { IndexPageTemplate } from "../../templates/index-page";
import GlobalStyle from "../../styles/GlobalStyle";
import { Normalize } from "styled-normalize";

const IndexPagePreview = ({ entry }) => {
  const data = entry.getIn(["data"]).toJS();

  if (data) {
    return (
      <>
        <Normalize />
        <GlobalStyle />
        <IndexPageTemplate
          title={data.title}
          heading={data.heading}
          description={data.description}
          email={data.email}
        />
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default IndexPagePreview;
