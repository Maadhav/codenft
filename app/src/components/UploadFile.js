import React from 'react'
import "./UploadFile.css"
import { BsFileEarmarkZip , BsFillImageFill} from 'react-icons/bs'

export default function ({type,style}) {
    return (
        <div className="container" style={style}>
            <div style={{display: "flex", flexDirection: "column",alignItems:"center", justifyContent: "center"}}>

            {
                type === "code" ?
                <BsFileEarmarkZip size={70}/>
                : <BsFillImageFill size={70} />
            }
            <p style={{fontSize:"20px",marginTop: "5px" }}>
                Drag and Drop
            </p>
            <p style={{fontSize: "12px", fontWeight: "bold",marginBottom: "20px"}}>or</p>
            <button className="buy-button">Upload</button>
            </div>
        </div>
    )
}


