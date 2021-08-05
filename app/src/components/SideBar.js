import React, { useContext } from 'react'
import "./SideBar.css"
import { IoIosArrowDown } from "react-icons/io"
import { Web3Context } from '../Web3Context'
const SideBar = () => {
    const [web3,] = useContext(Web3Context)
    return (
        <div className="side-container">
            <button className="side-main-content-container"
                onClick={(e) => {
                    var element = document.getElementById("chain-content");
                    if (element.style.display == "block")
                        element.style.display = "none"
                    else
                        element.style.display = "block"

                }}
            >Chain <IoIosArrowDown /></button>
            <div id="chain-content">
                <div style={{padding: "12px 23px"}}>
                    <div className="chain-container" onClick={async (e) => {
                        if (window.ethereum) {
                            try {
                              await window.ethereum.enable();
                              await window.ethereum.request({
                                method: 'wallet_switchEthereumChain',
                                params: [{ chainId: web3.utils.toHex("1337") }],
                              });
                            } catch (error) {
                              console.error(error);
                            }
                          }
                    }}><img className="chain-image" src="https://www.logolynx.com/images/logolynx/91/9147cbcba879619a4fa14ec70fd06fb0.jpeg"/>Ethereum</div>
                    <div className="chain-container" onClick={async (e) => {
                        if (window.ethereum) {
                            try {
                              await window.ethereum.enable();
                              await window.ethereum.request({
                                method: 'wallet_switchEthereumChain',
                                params: [{ chainId: web3.utils.toHex("80001") }],
                              });
                            } catch (error) {
                              console.error(error);
                            }
                          }
                    }}><img className="chain-image" src="https://cryptoclothing.cc/merch/polygon-matic-sticker.jpg"/>Polygon</div>
                </div>
            </div>
        </div>
    )
}

export default SideBar
