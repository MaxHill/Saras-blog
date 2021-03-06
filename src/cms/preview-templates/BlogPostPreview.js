import React from "react";
import PropTypes from "prop-types";
import { BlogPostTemplate } from "../../templates/blog-post";
import GlobalStyle from "../../styles/GlobalStyle";
import { Normalize } from "styled-normalize";

const BlogPostPreview = ({ entry, widgetFor }) => {
  const post = entry.getIn(["data"]).toJS();
  return (
    <>
      <Normalize />
      <GlobalStyle />
      <BlogPostTemplate
        content={widgetFor("body")}
        post={post}
        animate="enter"
      />
    </>
  );
};

BlogPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
};

export default BlogPostPreview;
