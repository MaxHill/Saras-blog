import React from "react";
import { Link, graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";
import colors from "../styles/colors";

const Roll = styled.section`
  background: #fff;
  max-width: 100rem;
  width: 90%;
  margin: 0 auto;
`;

const Post = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-rows: max-content;
  margin-bottom: 6rem;

  @media only screen and (min-width: 800px) {
    grid-template-columns: 2fr 3fr;

    &:nth-child(odd) {
      direction: rtl;
    }
  }
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-auto-rows: auto;
  grid-gap: 0.3rem;
  grid-auto-flow: dense;

  @media only screen and (min-width: 650px) {
    grid-template-columns: repeat(auto-fit, minmax(185px, 1fr));
  }

  @media only screen and (min-width: 900px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
`;

const GridItem = styled(Img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Text = styled(Link)`
  padding: 2rem;
  text-align: center;
  text-decoration: none;
  color: ${colors.text};
  transition: all 1s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 30rem;

  &:hover {
    color: ${colors.textHover};
    transition: all 0.3s ease;
  }
`;

const BlogRoll = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark;
  console.log(posts);
  return (
    <Roll>
      {posts &&
        posts.map(({ node: post }) => (
          <Post key={post.id}>
            <Text to={post.fields.slug}>
              <h2>{post.frontmatter.title}</h2>
              <p>{post.frontmatter.description}</p>
            </Text>
            <Grid>
              {post.frontmatter.galleryImages.length &&
                post.frontmatter.galleryImages.map(image => (
                  <GridItem
                    key={image.childImageSharp.fluid.src}
                    fluid={image.childImageSharp.fluid}
                    alt={post.frontmatter.title}
                  />
                ))}
            </Grid>
          </Post>
        ))}
    </Roll>
  );
};

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                description
                galleryImages {
                  childImageSharp {
                    fluid(maxWidth: 350, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
);
