import React from 'react'
import { useHistory,useLocation } from 'react-router-dom'
import "./marketplace.css"
import NFTTile from './NFTTile'
const Marketplace = () => {
    const history = useHistory();
    const location = useLocation()
    const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    return (
        <div className="grid-section">
            {
                data.map((e, i) => {
                    return <NFTTile onClick={() => {history.push("details/0")}} key={e}/>
                })
            }
        </div>
    )
}

export default Marketplace
