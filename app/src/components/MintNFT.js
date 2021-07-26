import React from 'react'
import { Row, Col, Input, Textarea, Button } from 'atomize'
import UploadFile from "./UploadFile"
const MintNFT = () => {
    return (
        <div style={{ padding: "89px 91px" }}>
            <Row>
                <Col size="9" >
                    <UploadFile type="code" />
                </Col>
                <Col size="3" >
                    <UploadFile type="image" />
                </Col>
            </Row>
            <Row style={{ marginTop: "20px" }}>
                <Col xs="12">
                    <Input style={{  height: "6vh", borderRadius: "12px" }} type="text" placeHolder="Name" />
                </Col>
                {/* <Col xs="6">
                </Col> */}
            </Row>
            <div style={{ marginTop: "20px" }}>
                <Textarea style={{  height: "20vh", borderRadius: "12px", fontFamily: "Lato", }} type="text" placeHolder="Description" />
            </div>
            <Row style={{ marginTop: "20px" }}>
                <Col xs="12">
                    <Input style={{ width: "40vw", height: "6vh", borderRadius: "12px" }} type="text" placeHolder="Price" />
                </Col>
                {/* <Col xs="6">
                </Col> */}
            </Row>
            <Row style={{ marginTop: "20px" }}>
                <Button style={{width: "100%", height: "7vh",borderRadius: "12px",fontFamily: "Lato", fontSize: "24px",background: "#094eff"}}>Upload</Button>
            </Row>
        </div>
    )
}

export default MintNFT
