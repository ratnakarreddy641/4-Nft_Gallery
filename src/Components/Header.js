import React from 'react'
import './Components.css';
import logo from '../Media/Logo.png'


function Header() {
  return (
    <div class="Head">
        <div class="TitleSection">
            <img class="Logo" src={logo}/>
            <h3 class="Title">MetaPlex</h3>
        </div>
        <h3>an NFT Gallery</h3>
    </div>
  )
}

export default Header;