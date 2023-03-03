import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'utils/style/GlobalStyle';
import Header from 'components/Header';
import Home from 'pages/Home';
import { theme } from 'utils/style/theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <GlobalStyle />
                <Header />
                <Routes>
                    <Route element={<Home />} path="/" />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
