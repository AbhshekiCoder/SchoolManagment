import { useEffect } from "react";

function Qr(){
    useEffect(()=>{
        let upiId = "upi://pay?pa=6266834504@ptsbi&pn=Abhishek Gour&am=1000000&cu=100&tn=Payment";
        const qrcode = new QRCode(document.getElementById("qr-code"),{
            text: upiId,
            width: 200,
            height: 200,
            colorDark: "black",
            colorLight: "white"
        })

    },[])
    
    return(
        <>
        <div id = "qr-code" className=" h-52 w-52 m-auto border">

        </div>

        </>
    )
}
export default Qr;