import { data } from 'autoprefixer';
import { useState } from 'react';
import './App.css';
import Header from './Components/Header';
import NFTCard from './Components/NFTCard';


function App() {
  const[wallet,setWallet] = useState("");
  const[collection,setCollection]=useState("");
  const[NFTs,setNFTs]=useState([]);
  const[checkbox,isBoxChecked]=useState(false);
  let[startItems,setStartItems] = useState(0);

  const fetchNFTs = async()=>{
    let nfts;
    const apiKey=process.env.REACT_APP_apiKey;
    console.log("Fetching NFTs",apiKey);
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTs/`;

    if(!collection.length){  
    var requestOptions = {
      method:'GET'
    };
    
    const fetchURL = `${baseURL}?owner=${wallet}`;  https://eth-mainnet.alchemyapi.io/v2/FGHH/getNFTs/?owner=SASSADCSDC   
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
    const apiKey = process.env.REACT_APP_apiKey;
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTsForCollection/`;
    const fetchURL = `${baseURL}?contractAddress=${collection}&startToken=${startItems}&withMetadata=${"true"}`;
    const nfts = await fetch(fetchURL,requestOptions).then(data =>data.json());
    console.log(fetchURL);
    if(nfts){
      console.log("NFTs In Collection: ",nfts);
      setNFTs(nfts.nfts);
    }
    }
  }

  return (
    <div className="App flex flex-col items-center justify-center py-8 gap-y-3">
      <Header/>
      <div class="Inputs"> 
        <input onChange={(e)=>{setWallet(e.target.value)}} value={wallet} placeholder='Wallet Address'   ></input>
        <input onChange={(e)=>{setCollection(e.target.value)}} value={collection} placeholder='Collection Address' ></input>
      </div>   
      <label ><input onChange={(e)=>{isBoxChecked(e.target.checked)}} type="checkbox" id="GetCollection"></input>Fetch for Collection</label>
      <button class="Go" onClick={
        ()=>{
          if(checkbox){
            fetchNFTsForCollection();
          }else fetchNFTs();
        }
      } >Go</button>

      <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
        {
          NFTs.length && NFTs.map(nft => { 
            return (
              <NFTCard nft={nft}></NFTCard>
            )
          })
        }
      </div>
      <div>
        <button class="BottomBtns" onClick={()=>{
          if(startItems>=100){
            setStartItems(startItems-100);
            fetchNFTsForCollection();
          }
        }}>Prev</button>
        <button class="BottomBtns" onClick={()=>{
            setStartItems(startItems+100);            
            console.log(startItems);
            fetchNFTsForCollection();
          
        }} >Next</button>
      </div>

    </div>
  );
}

export default App;
