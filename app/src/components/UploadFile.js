import React from 'react'
import "./UploadFile.css"
import { BsCodeSlash } from 'react-icons/bs'
import { BiImage}  from "react-icons/bi"

export default function ({type}) {
    return (
        <div className="container">
            {
                type === "code" ?
                <BsCodeSlash size={200}/>
                : <BiImage size={200} color="#666"/>
            }
        </div>
    )
}


