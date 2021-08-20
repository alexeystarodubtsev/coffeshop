import React from 'react';
import './App.css';
import store from './store';
import { Provider } from 'react-redux';
import { Header } from './components/Header';
import { GoodsCard } from './components/GoodsCard';

const App = () => (
    <Provider store={store}>
        <div>
            <Header />
            <GoodsCard
                imageUrl={'/img/cappuccino.jfif'}
                info={`An espresso-based coffee drink that originated in Italy, and is simply prepared with steamed milk foam (microfoam)`}
                name={'cappuccino'}
                price={100}
            />
        </div>
    </Provider>
);

export default App;
