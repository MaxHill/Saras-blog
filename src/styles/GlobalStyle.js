import { createGlobalStyle } from "styled-components";
import colors from "../styles/colors";

export default createGlobalStyle`

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
    color: ${colors.text};
  }

  ::selection {
    background-color: ${colors.oliveGreen};
    color: ${colors.offWhite};
}

  h1,h2,h3,h4,h5,h6 {
    font-weight: 600;
    font-family: 'Merriweather', serif;
  }

  p {
    line-height: 1.7;
    letter-spacing: .05rem;
  }

  .sr-only:not(:focus):not(:active) {
    clip: rect(0 0 0 0);
    clip-path: inset(100%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  .underlay {
    transition: background-color .3s ease;
    background-color: transparent;

    &.-enter {
      background-color: ${colors.offWhite07};
    }
  }
`;
