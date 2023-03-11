import './App.css';
import { GameBoardComponent } from './components/gameboard/Gameboard';
import { InitGameButton } from './components/initGameButton/InitGameButton';

function App() {
    return (
        <div className="App">
            <InitGameButton />
            <GameBoardComponent />
        </div>
    );
}

export default App;
