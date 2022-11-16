import React from 'react';
import ReactDOM from 'react-dom';
import Boardview from './components/board';
import './main.scss';
import './styles.scss';

const App = () => {
    return (
        <Boardview />
    )
}
ReactDOM.render(<App />, document.getElementById('root'));