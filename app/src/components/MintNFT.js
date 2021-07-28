import React, { useContext, useEffect, useState } from "react";
import { Input, Textarea, Button, Icon } from "atomize";
import {} from "react-icons";
import UploadFile from "./UploadFile";
import "./MintNFT.css";
import NFTTile from "./NFTTile";
import { NFTStorage, File } from "nft.storage";

const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQ3MDk4OWIzN2JlMjExN2QwYWE2MGRCNmYyMzIzODQ5NTQzMjNiRDYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyNjA4NzY0NTU5NSwibmFtZSI6InRlc3QifQ.CSD7bSQgXEzLIP8eTKxqJLYYmVEHulNdIoMHgGUCn5c";
const client = new NFTStorage({
  token: apiKey,
});

const MintNFT = ({ drizzle, drizzleState }) => {
  const [active, setActive] = useState(0);
  const [time, setTime] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(async () => {
    setTimeout(() => {
      setTime(false);
    }, 500);
  }, []);

  const onSell = async () => {
    // const metadata = await client.store({
    //   name: title,
    //   description: description,
    //   image: new File([thumbnail], "test2.jpg", { type: "image/jpg" }),
    //   properties: {
    //     code: new File([file], "code.zip", { type: "application/zip" }),
    //   },
    // });
    // console.log(metadata.url);
    const contract = drizzle.contracts.CodeNFT;
    console.log(
      contract.methods["mintToken"].cacheSend(drizzleState.accounts[0], "test.com",{from: drizzleState.accounts[0], gas:3000000})
    );
  };
  function onProgressChange(index) {
    setTime(true);
    setTimeout(() => {
      setTime(false);
      setActive(index);
    }, 500);
  }

  return (
    <div className="process-container">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <button
          className={`process-button ${
            active === 0 ? "active" : active < 0 ? "inprogress" : "completed"
          }`}
          onClick={() => onProgressChange(0)}
        >
          1.Source Code
        </button>
        <button
          className={`process-button ${
            active === 1 ? "active" : active < 1 ? "inprogress" : "completed"
          }`}
          onClick={() => onProgressChange(1)}
        >
          2.Thumbnail
        </button>
        <button
          className={`process-button ${
            active === 2 ? "active" : active < 2 ? "inprogress" : "completed"
          }`}
          onClick={() => onProgressChange(2)}
        >
          3.Details
        </button>
        <button
          className={`process-button ${
            active === 3 ? "active" : active < 3 ? "inprogress" : "completed"
          }`}
          onClick={() => onProgressChange(3)}
        >
          4.Price
        </button>
        <button
          className={`process-button ${
            active === 4 ? "active" : active < 4 ? "inprogress" : "completed"
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
              onFileDrop={(e) => {
                console.log(e);
                setFile(e);
              }}
            />
          ) : active === 1 ? (
            <UploadFile
              type="image"
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
                  src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
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
                <NFTTile onClick={(e) => console.log(e)} />
                <p style={{ padding: "10px 0px" }}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
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
  );
};

export default MintNFT;
