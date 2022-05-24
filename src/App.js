
import './App.css';

function App() {
  return (
    <div className="App">
      <input class="ip" placeholder='Wallet Address'   ></input>
      <input class="ip" placeholder='Contract Address' ></input>
      <input  type="checkbox" id="Contract_Check"></input>
      <label for="Contract_Check" >Keep Contract</label>
      <button>Go</button>
    </div>
  );
}

export default App;
