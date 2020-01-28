import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import BlogRoll from "../components/BlogRoll";
import styled from "styled-components";
import colors from "../styles/colors";

const Hero = styled.header`
  background: ${colors.offWhite};
  padding: 8rem;
  margin-bottom: 6rem;

  > .wrapper {
    max-width: 100rem;
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    > p {
      display: inline-block;
      margin: 1rem 0 2rem;
      max-width: 35rem;
      font-size: 1.125rem;
    }

    > a {
      flex-grow: 0;
      display: inline;
      color: ${colors.text};
      font-size: 1.125rem;
      border-bottom: 1px solid ${colors.text};
      text-decoration: none;
    }

    > h1 {
      max-width: 35rem;
      font-weight: 600;
    }
  }
`;

export const IndexPageTemplate = ({ heading, description }) => (
  <main>
    <Hero>
      <div className="wrapper">
        <h1>{heading}</h1>
        <p>{description}</p>
        <a href="mailto:Sara@hilloco.se">Sara@hilloco.se</a>
      </div>
    </Hero>
    <BlogRoll />
  </main>
);

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        title={frontmatter.title}
        heading={frontmatter.heading}
        description={frontmatter.description}
      />
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        heading
        description
      }
    }
  }
`;
