import React, { useContext, useEffect, useState } from "react";
import { Div, Button, Modal, Icon, Text, Textarea, Input } from "atomize";

import { } from "react-icons";
import UploadFile from "./UploadFile";
import "./MintNFT.css";
import NFTTile from "./NFTTile";
import { NFTStorage, File } from "nft.storage";
import { newContextComponents } from "@drizzle/react-components";
import { useHistory } from "react-router-dom";
import { Web3Context } from "../Web3Context";
import Code from "../contracts/CodeNFT.json"
import Market from "../contracts/CodeNFTMarket.json"
const { AccountData, ContractData, ContractForm } = newContextComponents;

const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQ3MDk4OWIzN2JlMjExN2QwYWE2MGRCNmYyMzIzODQ5NTQzMjNiRDYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyNjA4NzY0NTU5NSwibmFtZSI6InRlc3QifQ.CSD7bSQgXEzLIP8eTKxqJLYYmVEHulNdIoMHgGUCn5c";
const client = new NFTStorage({
  token: apiKey,
});


const MintNFT = () => {
  const [active, setActive] = useState(0);
  const [time, setTime] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory()
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [web3] = useContext(Web3Context)
  const [crypto, setCrypto] = useState(0)

  useEffect(() => {
    onStart()
  }, []);

  const onStart = async () => {
    var id = await web3.eth.getChainId()
    setCrypto(val => id === 80001 ? 1 : 0)
    setTimeout(() => {
      setTime(false);
    }, 500);
  }



  const onSell = async () => {
    var code = new web3.eth.Contract(Code.abi, crypto == 0 ? Code.networks[5777].address : "0x4fDfd855E5B26035F9d3aC5ED2751A51d990f0f4")
    var market = new web3.eth.Contract(Market.abi, crypto == 0 ? Market.networks[5777].address : "0xE401B8186dFa32C0b04ec33d3c2350a665c86f64")
    let accounts = await window.web3.eth.getAccounts()
    console.log(accounts)
    setLoading(true)
    setMsg("Creating IPFS...")
    const metadata = await client.store({
      name: title,
      description: description,
      image: new File([thumbnail], thumbnail.name, { type: "image/jpg" }),
      properties: {
        code: new File([file], file.name, { type: "application/zip" }),
      },
    });
    setMsg("Created IPFS...")
    setTimeout(() => {
      setMsg("Minting the NFT...")
    }, 3000);
    await code.methods.createToken(market.options.address, metadata.url).send({ from: accounts[0], gas: 3000000 })
    setTimeout(() => {
      setMsg("Minted the NFT...")
    }, 3000);
    setTimeout(async () => {
      const tokenId = await code.methods.getLatestTokenId().call()
      console.log(tokenId);
      setTimeout(() => {
        setMsg("Create Market Item ...")
      }, 3000);
      await market.methods.createMarketItem(web3.utils.toHex(code.options.address), tokenId, web3.utils.toWei(`${price}`, "ether"),).send({ from: accounts[0], gas: 3000000})
      setTimeout(() => {
        setMsg("Created Market Item ...")
      }, 3000);
      setLoading(false)
      history.replace("")
    }, 5000);
  };
  function onProgressChange(index) {
    setTime(true);
    setTimeout(() => {
      setTime(false);
      setActive(index);
    }, 500);
  }

  return (
    <>
      <div className="process-container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <button
            className={`process-button ${active === 0 ? "active" : active < 0 ? "inprogress" : "completed"
              }`}
            onClick={() => onProgressChange(0)}
          >
            1.Source Code
          </button>
          <button
            className={`process-button ${active === 1 ? "active" : active < 1 ? "inprogress" : "completed"
              }`}
            onClick={() => onProgressChange(1)}
          >
            2.Thumbnail
          </button>
          <button
            className={`process-button ${active === 2 ? "active" : active < 2 ? "inprogress" : "completed"
              }`}
            onClick={() => onProgressChange(2)}
          >
            3.Details
          </button>
          <button
            className={`process-button ${active === 3 ? "active" : active < 3 ? "inprogress" : "completed"
              }`}
            onClick={() => onProgressChange(3)}
          >
            4.Price
          </button>
          <button
            className={`process-button ${active === 4 ? "active" : active < 4 ? "inprogress" : "completed"
              }`}
            onClick={() => onProgressChange(4)}
          >
            5.Final
          </button>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div
            style={
              active === 4
                ? { opacity: time ? 0 : 1 }
                : { height: "68vh", width: "68vh", opacity: time ? 0 : 1 }
            }
            className={`fade`}
          >
            {active === 0 ? (
              <UploadFile
                type="code"
                onCompleted={() => {
                  setTime(true);
                  setTimeout(() => {
                    setTime(false);
                    setActive(1);
                  }, 500);
                }}
                onFileDrop={(e) => {
                  console.log(e);
                  setFile(e);
                }}
              />
            ) : active === 1 ? (
              <UploadFile
                type="image"
                onCompleted={() => {
                  setTime(true);
                  setTimeout(() => {
                    setTime(false);
                    setActive(2);
                  }, 500);
                }}
                onFileDrop={(e) => {
                  console.log(e);
                  setThumbnail(e);
                }}
              />
            ) : active === 2 ? (
              <div className="process-section">
                <div style={{ margin: "5vh" }}>
                  <Input
                    style={{ height: "6vh" }}
                    type="text"
                    placeHolder="Title"
                    onChange={(e) => setTitle(e.currentTarget.value)}
                    value={title}
                  />
                  <Textarea
                    style={{
                      height: "48vh",
                      fontFamily: "Lato",
                      marginTop: "4vh",
                    }}
                    type="text"
                    placeHolder="Description"
                    onChange={(e) => setDescription(e.currentTarget.value)}
                    value={description}
                  />
                </div>
              </div>
            ) : active === 3 ? (
              <div className="process-section">
                <div style={{ margin: "5vh" }}>
                  <img
                    src={thumbnail ? URL.createObjectURL(thumbnail) : "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"}
                    style={{ height: "48vh", width: "100%", marginBottom: "4vh" }}
                    className="nft-image-container"
                  />
                  <Input
                    style={{
                      width: "40vw",
                      height: "6vh",
                      padding: "0 0 0 5.2rem",
                      fontSize: "2.9vh",
                      borderColor: "#c9ced6",
                    }}
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.currentTarget.value)}
                    required
                    min={0}
                    placeHolder="100.00"
                    step=".00"
                    prefix={
                      <Div>
                        <select
                          style={{
                            position: "absolute",
                            width: "5rem",
                            borderRadius: "6px",
                            height: "6vh",
                            backgroundColor: "#c9ced6",
                            color: "black",
                            border: "none",
                            fontSize: "2.2vh",
                          }}
                          rounded={{ r: "md" }}
                          value={crypto}
                          onChange={async (e) => {
                            setCrypto(e.currentTarget.value);
                            if (e.currentTarget.value == 0) {
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
                            }
                            else if (e.currentTarget.value == 1) {
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
                            }
                          }}
                        >
                          <option value={0}>
                            ETH
                          </option>
                          <option value={1}>
                            MATIC
                          </option>
                        </select>
                      </Div>
                    }
                  />
                </div>
              </div>
            ) : (
              <div style={{ padding: "0px 50px" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: "5vh",
                  }}
                >
                  <NFTTile onClick={(e) => console.log(e)} imgSrc={URL.createObjectURL(thumbnail)} title={title} price={price} />
                  <p style={{ padding: "10px 0px", whiteSpace: "pre-line" }}>
                    {description}
                  </p>
                  <button className="buy-button" onClick={onSell}>
                    Sell
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {/*<Row>
                <Col size="9" >
                </Col>
                <Col size="3" >
                </Col>
            </Row>
            <Row style={{ marginTop: "20px" }}>
                <Col xs="12">
                </Col>
            </Row>
            <div style={{ marginTop: "20px" }}>
            </div>
            <Row style={{ marginTop: "20px" }}>
                <Col xs="12">
                </Col>
            </Row>
            <Row style={{ marginTop: "20px" }}>
                <Button style={{width: "100%", height: "7vh",borderRadius: "12px",fontFamily: "Lato", fontSize: "24px",background: "#094eff"}}>Upload</Button>
            </Row>*/}
      </div>
      {loading && <LoadingProgress isOpen={loading} msg={msg} />}
    </>
  );
};

export default MintNFT;



const LoadingProgress = ({ isOpen, msg }) => {
  return (
    <Modal isOpen={isOpen} align="center" rounded="md">
      <Div d="flex" align="center" justify="center">
        <div className="loader"></div>
      </Div>
      <Div d="flex" m={{ b: "4rem" }}>
        <Text p={{ l: "0.5rem", t: "0.25rem" }} align="center" textSize="subheader">
          {msg}
        </Text>
      </Div>
    </Modal>
  );
};
