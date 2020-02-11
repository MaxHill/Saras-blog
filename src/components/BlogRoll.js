import React, { useState } from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";
import colors from "../styles/colors";
import { BlogPostTemplate } from "../templates/blog-post";
import AriaModal from "react-aria-modal";
import Minimize from "./Minimize";
import useBlogPosts from "./BlogPosts";

const Roll = styled.section`
  background: ${colors.white};
  max-width: 100rem;
  width: 90%;
  margin: 0 auto;
`;

const Post = styled(Link)`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-rows: max-content;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-bottom: 3rem;

  padding-bottom: 3rem;
  border-bottom: 1px solid ${colors.offWhite};

  h2 {
    margin-top: 0;
    margin-bottom: 0.2rem;
  }

  @media only screen and (min-width: 800px) {
    grid-template-columns: 2fr 3fr;
    margin-bottom: 8rem;
    padding-bottom: 0rem;
    border-bottom: none;

    &:nth-child(odd) {
      direction: rtl;
    }

    &:hover {
      transform: scale(1.05);
      background: ${colors.offWhite};
      border-radius: 0.5rem;
      overflow: hidden;
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

const Text = styled.div`
  padding: 0 2rem;
  margin-bottom: 2rem;
  text-align: center;
  text-decoration: none;
  color: ${colors.text};
  transition: all 1s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 30rem;
`;

const CloseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 50%;
  top: 1rem;
  margin-left: -1.5rem;
  background: ${colors.oliveGreen};
  color: ${colors.white};
  width: 3rem;
  height: 3rem;
  border-radius: 2.5rem;
  font-family: "Roboto Slab", serif;
  font-weight: 600;
  cursor: pointer;
  z-index: 1;
  border: 2px solid ${colors.oliveGreen};
  transition: all 0.3s ease;

  opacity: ${p => (p.animate === "enter" ? "1" : "0")};
  transform: translate3d(
    ${p => (p.animate === "enter" ? "0, 0, 0" : "0, -5rem, 0")}
  );

  :hover,
  :active,
  :focus {
    outline: none;
  }
`;

const BlogRoll = () => {
  const [selectedPost, setSelectedPost] = useState(false);
  const [animate, setAnimate] = useState("exit");
  const posts = useBlogPosts();

  const openPost = (e, post) => {
    e.preventDefault();
    setSelectedPost(post);
  };
  const closePost = () => {
    setAnimate("exit");
    setTimeout(() => setSelectedPost(false), 300);
  };
  return (
    <Roll>
      {posts &&
        posts.map(({ node: post }) => (
          <Post
            key={post.id}
            to={post.fields.slug}
            onClick={e => openPost(e, post)}
          >
            <Text>
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

      <AriaModal
        titleText="Read more post"
        onExit={() => closePost()}
        onEnter={() => setAnimate("enter")}
        mounted={selectedPost}
        underlayClickExits={true}
        verticallyCenter={true}
        underlayColor={false}
        underlayClass={animate === "enter" ? "underlay -enter" : "underlay"}
      >
        <>
          <CloseButton animate={animate} onClick={() => closePost()}>
            <span className="sr-only">Close</span>
            <Minimize />
          </CloseButton>
          <BlogPostTemplate
            content={selectedPost.html}
            post={selectedPost.frontmatter}
            inline={true}
            animate={animate}
          />
        </>
      </AriaModal>
    </Roll>
  );
};

export default BlogRoll;
