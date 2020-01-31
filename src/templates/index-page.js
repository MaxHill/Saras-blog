import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";

import Layout from "../components/Layout";
import BlogRoll from "../components/BlogRoll";
import styled from "styled-components";
import colors from "../styles/colors";

const Hero = styled.header`
  background: ${colors.offWhite};
  padding: 4rem 0;
  margin-bottom: 3rem;
  @media only screen and (min-width: 650px) {
    padding: 8rem;
  }
  @media only screen and (min-width: 800px) {
    margin-bottom: 8rem;
  }

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
      color: ${colors.oliveGreen};
      font-size: 1.2rem;
      text-decoration: none;
      /* font-weight: 600; */
      border-bottom: 2px solid transparent;

      &:hover,
      &:focus,
      &:active {
        border-color: ${colors.oliveGreen};
      }
    }

    > h1 {
      max-width: 35rem;
      font-weight: 600;
    }
  }
`;

export const IndexPageTemplate = ({ title, heading, description, email }) => (
  <main>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
    </Helmet>
    <Hero>
      <div className="wrapper">
        <h1>{heading}</h1>
        <p>{description}</p>
        <a href={`mailto:${email}`}>{email}</a>
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
        email={frontmatter.email}
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
        email
      }
    }
  }
`;
