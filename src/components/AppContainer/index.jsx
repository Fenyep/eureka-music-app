import { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../utils/context";

const ContainerDiv = styled.div`
    width: 370px;
    height: auto;
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
    aiign items: center;
    position: relative;
    overflow: hidden;
    background: ${({ theme }) => (theme === "light" ? "#fff" : "#000a12")};
    border-radius: 30px;
    box-shadow: ${({ theme }) =>
        theme === "light"
            ? "0px 5px 5px 10px #333"
            : "0px 5px 5px 10px #bdbdbd"};
    `;

const AppContainer = ({ children }) => {
    // Context section
    const { theme } = useContext(ThemeContext);

    return <ContainerDiv theme={theme}>{children}</ContainerDiv>;
};

export default AppContainer;
