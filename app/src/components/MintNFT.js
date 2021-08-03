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

  useEffect(() => {
    onStart()
  }, []);

  const onStart = async () => {
    setTimeout(() => {
      setTime(false);
    }, 500);
  }



  const onSell = async () => {
    var code = new web3.eth.Contract(Code.abi, false ? '0xE64D34F9C0cDB9022285680950EF002902570B78' : "0xC5E47C64c30c82f2Fb768e0C73614b0813aDeD23")
    var market = new web3.eth.Contract(Market.abi, false ? '0x0813ad9C2514A81bC9e1188BC1341c63a6Ab478f' : "0x3e3908ca1329001dc1b85f53C6FDbe20ae83deBC")
    
    setLoading(true)
    setMsg("Create IPFS...")
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
    await code.methods.createToken(market.options.address, metadata.url).send({from :"0x056b05d110E45f89839DEE1F23a52AFc2f58fD52", gas: 3000000 })
    setTimeout(() => {
      setMsg("Minted the NFT...")
    }, 3000);
    setTimeout(async () => {
      const tokenId = await code.methods.getLatestTokenId().call()
      console.log(tokenId);
      setTimeout(() => {
        setMsg("Create Market Item ...")
      }, 3000);
      await market.methods.createMarketItem(web3.utils.toHex(code.options.address), tokenId, web3.utils.toWei(`${price}`, "ether"),).send({from: "0x056b05d110E45f89839DEE1F23a52AFc2f58fD52", value: web3.utils.toWei("0.1", "ether"), gas: 3000000 })
      setTimeout(() => {
        setMsg("Created Market Item ...")
      }, 3000);
      setLoading(false)
    }, 5000);
    history.replace("")
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
                      padding: "0 0 0 4rem",
                      fontSize: "2.9vh",
                      borderColor: "#c9ced6",
                    }}
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.currentTarget.value)}
                    required
                    placeHolder="100.00"
                    step=".00"
                    prefix={
                      <Button
                        pos="absolute"
                        onClick={() => console.log("clicked")}
                        w="3rem"
                        top="0"
                        left="0"
                        style={{
                          borderRadius: "6px",
                          height: "6vh",
                          backgroundColor: "#c9ced6",
                          color: "black",
                          fontSize: "2.9vh",
                        }}
                        rounded={{ r: "md" }}
                      >
                        $
                      </Button>
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
