import React from 'react'
import { Row, Col, Input, Textarea, Button } from 'atomize'
import UploadFile from "./UploadFile"
const MintNFT = () => {
    return (
        <div style={{ padding: "89px 91px" }}>
            <Row>
                <Col xs="6" style={{margin: "0px 20px 0px 0px"}}>
                    <UploadFile type="code" />
                </Col>
                <Col xs="6" style={{margin: "0px 0px 0px 20px"}}>
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
                <Button style={{width: "100%", height: "6vh",fontFamily: "Lato", fontSize: "24px"}}>Upload</Button>
            </Row>
        </div>
    )
}

export default MintNFT
