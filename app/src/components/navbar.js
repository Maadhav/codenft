
import React, { useState } from 'react'
import './navbar.css'
import { Input, Icon } from "atomize";
import { FaCloudUploadAlt, FaRegUserCircle } from "react-icons/fa"
import { IoWalletOutline } from "react-icons/io5"
import { useHistory,useLocation } from 'react-router-dom';

export const Navbar = () => {
    const history = useHistory()
    const location = useLocation()

    const [index, setIndex] = useState(0)


    function changeIndex(value) {
        setIndex(() => value);
    }
    return (
        <div className="navbar">
            <div className="logo-container">
                <div>
                    <img src="https://cdn.logo.com/hotlink-ok/logo-social.png" alt="logo" height={50} width={50} />
                </div>
                <div style={{  fontWeight: "bold", fontSize: 24, verticalAlign: "middle" }}>CodeNFT</div>
            </div>
            <div className="search-container">
                <Input
                    placeholder="Search"
                    suffix={
                        <Icon
                            name="Search"
                            size="20px"
                            cursor="pointer"
                            onClick={() => console.log("clicked")}
                            pos="absolute"
                            top="50%"
                            right="1rem"
                            transform="translateY(-50%)"
                        />} /></div>
            <div className="menu-container">
                <div className="menu-item" onClick={() => {changeIndex(0); history.replace()}}>
                    <div className="menu-item-text">Marketplace</div>
                    <div className={index === 0 ? "menu-item-active" : ""}></div>
                </div>
                <div className="menu-item" onClick={() => {changeIndex(1); history.push("/mynfts")}}>
                    <div className="menu-item-text">My NFTs</div>
                    <div className={index === 1 ? "menu-item-active" : ""}></div>
                </div>
            </div>
            <div className="action-container">
            <span
          className="outline-button"
          onClick={() => history.push("/mint")}
        >
          <FaCloudUploadAlt
            color={"#FFFFFF"}
            size={25}
            style={{ marginRight: "10px" }}
          />
          Upload
        </span>
          <FaRegUserCircle
            className="action-button"
          />
          <IoWalletOutline
            className="action-button"
            style={{ paddingRight: "30px" }}
          />
            </div>
        </div>
    )
}
