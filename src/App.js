import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "utils/style/GlobalStyle";
import Header from "components/Header";
import Home from "pages/Home";
import { theme } from "utils/style/theme";
import { useRecoilValue } from "recoil";
import { isLoginModalState } from "store/atoms";
import LoginModal from "components/LoginModal";

function App() {
  const isVisibleLoginModal = useRecoilValue(isLoginModalState);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route element={<Home />} path="/" />
        </Routes>
        {isVisibleLoginModal === true && <LoginModal />}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
