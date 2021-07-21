import React from 'react'
import "./DetailsPage.css"


const DetailsPage = () => {
    return (
        <div style={{ display: "flex", }}>
            <div style={{ flex: 1, display: "flex", height: "92vh", alignItems: "center", justifyContent: "center" }}>
                <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" style={{ height: "75vh", width: "40vw", borderRadius: "15px", boxShadow: "3px 3px 12px rgba(0,0,0,0.25)" }} />
            </div>
            <div style={{ flex: 1, height: "84vh", paddingTop: "8vh" }}>
                <div style={{ fontSize: "4.8vh", textAlign: "left" }}>Meagan Fisher</div>
                <div className="price-container">
                    <div style={{ padding: "13px 20px" }}>
                        <div style={{ fontWeight: "500" }}>Price</div>
                        <div style={{ display: "flex", marginTop: "20px", alignItems: "baseline" }}>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png" style={{ height: "30px", marginRight: "10px" }} alt="https://toppng.com/uploads/preview/erreur-404-11550708744oo95egrxlp.png" />
                            <div style={{ fontWeight: "500", fontSize: "3vh" }}>1</div>
                            <div style={{ fontSize: "1.9vh", verticalAlign: "baseline", marginLeft: "5px", fontWeight: "300" }}>(2,019)</div>
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end", marginRight: "40px" }}>

                        <button className="buy-button">Buy</button>
                    </div>
                </div>
                <div className="description-container">

                    <div style={{ padding: "13px 20px" }}>
                        <div style={{ fontWeight: "500", fontSize: "3.1vh" }}>Description</div>
                        <p style={{fontSize: "2.4vh",lineHeight: "41px",paddingTop: "20px",letterSpacing: "0.03em"}}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailsPage
