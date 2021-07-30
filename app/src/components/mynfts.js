import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import "./marketplace.css"
import axios from "axios"
import NFTTile from './NFTTile'
import { imageCidandImage } from '../utils/utils'
const MyNFTs = ({ drizzle, drizzleState }) => {
    const history = useHistory();
    const location = useLocation()
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getData()
    }, [])


    // "ipfs://bafybeicaclfcqnrkeo2a4lj7xtpddbtyydjtxlmfmvnrsswms26t74m7uu/Image.png"

    async function getData() {
        const market = drizzle.contracts.CodeNFTMarket
        const code = drizzle.contracts.CodeNFT
        var data = [];
        data = await market.methods.fetchMyNFTs().call()
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
        setItems(val => [...val, ...parsedData])
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
                        }} key={e.itemId} price={parseFloat(drizzle.web3.utils.fromWei(e.price, "ether")).toFixed(2)} imgSrc={e.imageUrl} title={e.name} />
                    })
                }
            </div>
    )
}

export default MyNFTs
