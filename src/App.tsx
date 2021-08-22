import React from 'react';
import './App.css';
import store from './store';
import { Provider } from 'react-redux';
import { Header } from './components/Header';
import { GoodsList } from './components/GoodsList';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Notifications } from './components/Notifications';

const theme = createTheme({
    palette: {
        primary: {
            main: '#000'
        },
        secondary: {
            main: '#FFD700'
        }
    }
});

const App = () => (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <div>
                <Header />
                <GoodsList />
                <Notifications />
            </div>
        </ThemeProvider>
    </Provider>
);

export default App;
