import './App.css';
import { GameBoardComponent } from './components/Gameboard/Gameboard';
import { InitGameButton } from './components/InitGameButton/InitGameButton';

function App() {
    return (
        <div className="App">
            <InitGameButton />
            <GameBoardComponent />
        </div>
    );
}

export default App;
