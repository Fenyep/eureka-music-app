import { createGlobalStyle } from "styled-components";
import { ThemeContext } from "../context";
import { useContext } from "react";

const StyledGlobalStyle = createGlobalStyle`

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: ${({ theme }) =>
        theme === "light"
            ? "linear-gradient(to right, #ffa000, #ac1900);"
            : "linear-gradient(to right, #484848, #000);"} 
    font-family: 'Poppins', cursive;
}
`;

function GlobalStyle() {
    const { theme } = useContext(ThemeContext);

    return <StyledGlobalStyle theme={theme} />;
}

export default GlobalStyle;
