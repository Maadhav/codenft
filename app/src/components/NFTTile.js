import React, { useContext, useEffect, useState } from 'react'
import "./NFTTile.css"
import { AiOutlineHeart } from "react-icons/ai"
import { Web3Context } from '../Web3Context'

const NFTTile = ({onClick, imgSrc , title, price}) => {
    const [web3,] = useContext(Web3Context)
    const [chainId, setId] = useState(0)
    async function getData() {
        var id = await web3.eth.getChainId()
        setId(id)
    }
    useEffect(() => {
        getData();
    },[])
    return (
        <div className={`item-container`} onClick={onClick}>
                        <img src={imgSrc ?? "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"} className="image-section" alt="https://toppng.com/uploads/preview/erreur-404-11550708744oo95egrxlp.png"/>
                        <div style={{ display: "flex", alignItems: "center", padding: "0px 20px",height: "6vh" }}>
                            <p style={{flex: "0.8",display: "flex",padding: "0px 10px"}}>{title}</p>
                            <div style={{flex: "0.2",display:"flex"}}><img src={chainId === 1337 ?  "https://cryptologos.cc/logos/ethereum-eth-logo.png":"https://cryptoclothing.cc/merch/polygon-matic-sticker.jpg" }style={{width: "3vh", height: "3vh"}}/><p>{price}</p></div>
                        </div>
                    </div>
    )
}

export default NFTTile
