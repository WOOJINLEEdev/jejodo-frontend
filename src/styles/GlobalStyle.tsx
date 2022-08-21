import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    width: 100%;
    min-height: 100%;
    font-family: 'Noto Sans KR', sans-serif;
  }

  button {
    cursor: pointer;
  }

  .visually_hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: 0;
    border: 0;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
  }

  .highlight {
    background: rgba(68, 152, 242, 0.5);
  }
`;
