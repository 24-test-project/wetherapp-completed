import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle` 
  ${reset} // 모든 css값을 초기화

html{
	width: 100%;
	height: 100%;
}
body {
	line-height: 1;
	background-image: url("/img/bg.jpg");
	background-repeat: no-repeat;
	background-size: cover;
	width: 100%;
	height: 100%;
 	overflow: hidden;
}

.a11y-hidden{
 clip: rect(1px, 1px, 1px, 1px);
 clip-path: inset(50%);
 width: 1px;
 height: 1px;
 margin: -1px;
 overflow: hidden;
 padding: 0;
 position: absolute;
}
`;

export default GlobalStyles;
