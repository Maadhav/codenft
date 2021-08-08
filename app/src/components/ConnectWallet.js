import React, { useContext } from 'react'
import { Div, Modal } from "atomize";
import Portis from "@portis/web3"
import Web3 from "web3"
import { Web3Context } from '../Web3Context';

const ConnectWallet = ({ isOpen }) => {
    const [web3, setWeb3] = useContext(Web3Context)
    return (
        <Modal isOpen={isOpen} align="center" rounded="md" maxW="24rem">
            <Div d="flex" align="center" justify="space-evenly">
                {window.ethereum &&
                <Div>
                    <img onClick={async () => {
                        if (window.ethereum) {
                            window.web3 = new Web3(window.ethereum);
                        }

                        let conn = await window.ethereum.enable();

                        let ethconnected = conn.length > 0;
                        if (ethconnected) {
                            let ethaddress = conn[0]; // get wallet address
                        }
                        window.web3.eth.getAccounts().then(console.log);
                        setWeb3(window.web3);
                    }} src="https://www.logolynx.com/images/logolynx/91/9147cbcba879619a4fa14ec70fd06fb0.jpeg" height={100} width={100} style={{ boxShadow: " 0px 0px 3px rgba(0, 0, 0, 0.25)", borderRadius: "50%", cursor: "pointer" }} />
                </Div>}
                <Div>
                    <img onClick={() => {
                        var portis = new Portis("f92f78e0-f2e3-4e31-a99e-8d34d4a7087f", {
                            nodeUrl: 'HTTP://127.0.0.1:7545',
                            chainId: 1337,
                        })
                        const web3Provider = new Web3(portis.provider);

                        setWeb3(
                            web3Provider
                        );
                    }} src="https://cryptoclothing.cc/merch/polygon-matic-sticker.jpg" height={100} width={100} style={{ boxShadow: " 0px 0px 3px rgba(0, 0, 0, 0.25)", borderRadius: "50%", cursor: "pointer" }} />
                </Div>
            </Div>
        </Modal>
    )
}

export default ConnectWallet
