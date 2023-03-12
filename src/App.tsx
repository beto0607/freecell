import './App.css';
import { useAppSelector } from './app/hooks';
import { GameBoardComponent } from './components/Gameboard/Gameboard';
import { InitGameButton } from './components/InitGameButton/InitGameButton';
import { selectBoardInitialized } from './features/gameboard/GameboardSlice';

function App() {
    const boardInitialized = useAppSelector(selectBoardInitialized);
    return (
        <div className="App">
            {!boardInitialized && <InitGameButton />}
            <GameBoardComponent />
        </div>
    );
}

export default App;
