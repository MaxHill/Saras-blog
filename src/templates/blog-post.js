import React from "react";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";

import Layout from "../components/Layout";
import { HTMLContent } from "../components/Content";
import Minimize from "../components/Minimize";
import colors from "../styles/colors";

const ImageGrid = styled.div`
  display: grid;
  max-height: 80vh;
  grid-gap: 0.5rem;
  grid-template-columns: repeat(auto-fill, minmax(90%, 90rem));
  grid-auto-flow: column;
  grid-auto-columns: minmax(90%, 90rem);
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  overflow-x: scroll;

  > .img {
    scroll-snap-align: center;
  }
`;

const ImageGridItem = styled(Img)`
  scroll-snap-align: center;
`;

const Wrapper = styled.section`
  max-width: 100rem;
  width: 90%;
  margin: ${p => (p.inline ? "5rem" : "0")} auto;
  background: ${colors.white};
  border-radius: ${p => (p.inline ? "0.5rem" : "0")};
  overflow: visible;
  overflow-x: hidden;
  position: relative;
  transition: all 0.3s ease;

  opacity: ${p => (p.animate === "enter" ? "1" : "0")};
  transform: scale(${p => (p.animate === "enter" ? "1" : ".9")});
`;

const Text = styled.div`
  padding: 3rem;
  max-width: 50rem;
  margin: 0 auto;
`;

const Preamble = styled.p`
  font-weight: 800;
  font-size: 1.2rem;
`;

export const BlogPostTemplate = ({ post, helmet, inline = false, animate }) => {
  return (
    <Wrapper inline={inline} animate={animate}>
      {helmet || ""}
      <ImageGrid>
        {post.frontmatter.galleryImages.length &&
          post.frontmatter.galleryImages.map(image => (
            <ImageGridItem
              className="img"
              key={image.childImageSharp.fluid.src}
              fluid={image.childImageSharp.fluid}
              alt={post.frontmatter.title}
            />
          ))}
      </ImageGrid>
      <Text>
        <h1>{post.frontmatter.title}</h1>
        <Preamble>{post.frontmatter.description}</Preamble>
        <HTMLContent content={post.html} />
      </Text>
      {post.tags && post.tags.length ? (
        <div>
          <h4>Tags</h4>
          <ul>
            {post.tags.map(tag => (
              <li key={tag + `tag`}>
                <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Wrapper>
  );
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <BlogPostTemplate
        post={post}
        animate="enter"
        helmet={
          <Helmet titleTemplate="%s | Sara Hill">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
      />
    </Layout>
  );
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        templateKey
        date(formatString: "MMMM DD, YYYY")
        featuredpost
        tags
        description
        galleryImages {
          childImageSharp {
            fluid(maxWidth: 700, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
