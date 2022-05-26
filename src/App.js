import { data } from 'autoprefixer';
import { useState } from 'react';
import './App.css';
import Header from './Components/Header';


function App() {
  const[wallet,setWallet] = useState("");
  const[collection,setCollection]=useState("");
  const[NFTs,setNFTs]=useState([]);
  const[checkbox,isChecked]=useState(false);
  
  const fetchNFTs = async()=>{
    let nfts;
    const apiKey=process.env.REACT_APP_apiKey;
    console.log("Fetching NFTs",apiKey);
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTs/`;

    if(!collection.length){
    var requestOptions = {
      method:'GET'
    };
    
    const fetchURL = `${baseURL}?owner=${wallet}`;
    nfts=await fetch(fetchURL,requestOptions).then(data =>data.json())
    }
    else{
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5b%5d=${collection}`;
      nfts=await fetch(fetchURL,requestOptions).then(data =>data.json())
    }
    if(nfts){
      console.log(nfts);
      setNFTs(nfts.ownedNfts);
    }

  }

  const fetchNFTsForCollection = async()=>{
    if(collection.length){
    var requestOptions = {
      method:'GET'
    };
    const apiKey = process.env.apiKey;
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTs/`;
    const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
    const nfts = await fetch(fetchURL,requestOptions).then(data =>data.json());
    if(nfts){
      console.log("NFTs In Collection: ",nfts);
      setNFTs(nfts.nfts);
    }
    }
  }

  return (
    <div className="App">
      <Header/>
      <div class="Inputs"> 
        <input onChange={(e)=>{setWallet(e.target.value)}} value={wallet} placeholder='Wallet Address'   ></input>
        <input onChange={(e)=>{setCollection(e.target.value)}} value={collection} placeholder='Collection Address' ></input>
      </div>   
      <label ><input  type="checkbox" id="GetCollection"></input>Fetch for Collection</label>
      <button onClick={
        ()=>{
          fetchNFTs();
        }
      } >Go</button>
    </div>
  );
}

export default App;
