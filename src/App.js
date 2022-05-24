
import './App.css';

function App() {
  return (
    <div className="App">
      <div class="Inputs"> 
        <input  placeholder='Wallet Address'   ></input>
        <input  placeholder='Contract Address' ></input>
      </div>   
      <label ><input  type="checkbox" id="GetCollection"></input>Get Collection</label>
      <button>Go</button>
    </div>
  );
}

export default App;
