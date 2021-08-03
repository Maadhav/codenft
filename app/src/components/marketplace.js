import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import "./marketplace.css"
import axios from "axios"
import NFTTile from './NFTTile'
import { imageCidandImage } from '../utils/utils'
import Code from "../contracts/CodeNFT.json"
import Market from "../contracts/CodeNFTMarket.json"
import Web3 from 'web3'
import { Web3Context } from '../Web3Context'
const Marketplace = () => {
    const history = useHistory();
    const location = useLocation()
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [web3,] = useContext(Web3Context)

    useEffect(() => {
        getData()
    }, [])


    // "ipfs://bafybeicaclfcqnrkeo2a4lj7xtpddbtyydjtxlmfmvnrsswms26t74m7uu/Image.png"

    async function getData() {
        var data = [];
        // console.log(web3);
        var code = new web3.eth.Contract(Code.abi,false?  '0xE64D34F9C0cDB9022285680950EF002902570B78':"0xC5E47C64c30c82f2Fb768e0C73614b0813aDeD23")
        var market = new web3.eth.Contract(Market.abi,false? '0x0813ad9C2514A81bC9e1188BC1341c63a6Ab478f': "0x3e3908ca1329001dc1b85f53C6FDbe20ae83deBC")
        // data = await market.methods.fetchMarketItems().call()
        // console.log(window.web3)
        // var parsedData = []
        // for (let index = 0; index < data.length; index++) {
        //     const e = data[index];
        //     var uri = (await code.methods.tokenURI(e.tokenId).call()).toString().split("ipfs://")[1].split("/metadata.json")[0]
        //     var result = await axios.get(`https://${uri}.ipfs.dweb.link/metadata.json`);
        //     parsedData.push({
        //         imageUrl: imageCidandImage(result.data.image),
        //         name: result.data.name,
        //         itemId: e.itemId,
        //         price: e.price,
        //     })
        // }
        // setItems(val => [...val, ...parsedData])
        // setLoading(false)
    }
    return (

        loading ? <div>Loading....</div> :
            <div className="grid-section" key={items.length} >
                {
                    items.map((e) => {
                        return <NFTTile onClick={(click) => {
                            click.preventDefault()
                            history.push(
                                "/details/" + e.itemId);
                        }} key={e.itemId} price={parseFloat(web3.utils.fromWei(e.price, "ether")).toFixed(2)} imgSrc={e.imageUrl} title={e.name} />
                    })
                }
            </div>
    )
}

export default Marketplace
