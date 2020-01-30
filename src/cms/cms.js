import CMS from "netlify-cms-app";
import uploadcare from "netlify-cms-media-library-uploadcare";
import cloudinary from "netlify-cms-media-library-cloudinary";
import withStyled from "./with-styled";

import AboutPagePreview from "./preview-templates/AboutPagePreview";
import BlogPostPreview from "./preview-templates/BlogPostPreview";
import IndexPagePreview from "./preview-templates/IndexPagePreview";

CMS.registerMediaLibrary(uploadcare);
CMS.registerMediaLibrary(cloudinary);

CMS.registerPreviewStyle(
  `https://fonts.googleapis.com/css?family=Raleway|Roboto+Slab&display=swap`
);
CMS.registerPreviewStyle(`/admin/cms.css`);

CMS.registerPreviewTemplate("index", withStyled(IndexPagePreview));
CMS.registerPreviewTemplate("about", withStyled(AboutPagePreview));
CMS.registerPreviewTemplate("blog", withStyled(BlogPostPreview));
