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
const MyNFTs = () => {
    const history = useHistory();
    const location = useLocation()
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [web3,] = useContext(Web3Context)

    useEffect(() => {
        getData()
        window.ethereum.on('networkChanged', function (accounts) {
            getData()
        })
    }, [])


    // "ipfs://bafybeicaclfcqnrkeo2a4lj7xtpddbtyydjtxlmfmvnrsswms26t74m7uu/Image.png"

    async function getData() {
        var id = await web3.eth.getChainId()
        var data = [];
        let accounts = await web3.eth.getAccounts()
        var code = new web3.eth.Contract(Code.abi, id == 1337 ? Code.networks[5777].address : "0x4fDfd855E5B26035F9d3aC5ED2751A51d990f0f4")
        var market = new web3.eth.Contract(Market.abi, id == 1337 ? Market.networks[5777].address : "0xE401B8186dFa32C0b04ec33d3c2350a665c86f64")
        data = await market.methods.fetchMyNFTs().call({ from: accounts[0] })
        console.log(data)
        var parsedData = []
        for (let index = 0; index < data.length; index++) {

            const e = data[index];

            var uri = (await code.methods.tokenURI(e.tokenId).call()).toString().split("ipfs://")[1].split("/metadata.json")[0]
            var result = await axios.get(`https://${uri}.ipfs.dweb.link/metadata.json`);
            parsedData.push({
                imageUrl: imageCidandImage(result.data.image),
                name: result.data.name,
                itemId: e.itemId,
                price: e.price,
            })
        }
        setItems(val => parsedData)
        setLoading(false)
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

export default MyNFTs
