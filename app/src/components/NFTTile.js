import React from 'react'
import "./NFTTile.css"
import { AiOutlineHeart } from "react-icons/ai"

const NFTTile = ({onClick}) => {
    return (
        <div className="item-container" onClick={onClick}>
                        <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" className="image-section" alt="https://toppng.com/uploads/preview/erreur-404-11550708744oo95egrxlp.png"/>
                        <div style={{ display: "flex", alignItems: "center", padding: "0px 20px",height: "6vh" }}>
                            <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" className="avatar-section"alt="https://toppng.com/uploads/preview/erreur-404-11550708744oo95egrxlp.png"/>
                            <p style={{flex: "0.8",display: "flex",padding: "0px 10px",fontSize:""}}>Meagan Fisher</p>
                            <AiOutlineHeart style={{flex: "0.2"}}/>
                        </div>
                    </div>
    )
}

export default NFTTile