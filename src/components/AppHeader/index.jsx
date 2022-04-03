import styled from "styled-components";
import {
    KeyboardArrowDownRounded,
    KeyboardArrowUpRounded,
    Brightness4Rounded,
    WbSunnyRounded,
} from "@material-ui/icons";
import { useContext } from "react";
import {
    MiniContext,
    ImageShowContext,
    ThemeContext,
} from "../../utils/context";

const HeaderDiv = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${({ theme }) => (theme === "light" ? "#000" : "#fff")};
    font-size: 20px;
`;

const AppHeader = () => {
    // Context section
    const { mini, toggleMini } = useContext(MiniContext);
    const { onShowMoreOrLessClick } = useContext(ImageShowContext);
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <HeaderDiv theme={theme}>
            {mini === "" ? (
                <KeyboardArrowDownRounded
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        onShowMoreOrLessClick();
                        toggleMini();
                    }}
                />
            ) : (
                <KeyboardArrowUpRounded
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        onShowMoreOrLessClick();
                        toggleMini();
                    }}
                />
            )}
            Eureka | C Music App
            {theme === "light" ? (
                <WbSunnyRounded
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleTheme()}
                />
            ) : (
                <Brightness4Rounded
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleTheme()}
                />
            )}
        </HeaderDiv>
    );
};

export default AppHeader;
