import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'SDSamliphopangche_Outline';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts-20-12@1.0/SDSamliphopangche_Outline.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'OTWelcomeBA';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2110@1.0/OTWelcomeBA.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'establishRoomNo703OTF';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2112@1.0/establishRoomNo703OTF.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'RIDIBatang';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.0/RIDIBatang.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

  * {
    box-sizing: border-box;
    font-family : RIDIBatang;
    color: ${(props) => (props.darkMode ? "var(--light)" : "var(--dark)")};
  }

  body {
    overflow: overlay;
  background-color: ${(props) =>
    props.darkMode ? "var(--dark)" : "var(--light)"};
  transition: all ease 0.3s;
  }

  ::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #ff444462, #ff932db7);
  border-radius: 100px;
}

.page {
  padding: 0.8rem;
  width: 1000px;
  min-height: calc(100vh - 50px);
  margin: auto;
  position: relative;
}

@media (max-width: 1000px) {
  .page {
    width: 100%;
  }
}

.slick-dots-bottom {
  bottom: 0 !important;
}

.slick-dots > li {
  background-color: orange !important;
}

.slick-active > button {
  background-color: transparent !important;
}

`;

export default GlobalStyle;
