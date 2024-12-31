import React, { useState, useEffect } from "react";
import JSZip from "jszip";
import QRCode from "qrcode";
import Image from "next/image";

const BlockSection = (props) => {
  const [qrCodeSrc, setQrCodeSrc] = useState(null); // State to hold QR Code image source

  // Generate QR Code as base64 when component loads
  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const arcadeId = props.api?.data || "No_Arcade_ID";
        const qrCodeBase64 = await QRCode.toDataURL(arcadeId); // Generate QR code as base64
        setQrCodeSrc(qrCodeBase64); // Save QR Code image source in state
      } catch (error) {
        console.error("Error generating QR Code:", error);
      }
    };

    generateQRCode();
  }, [props.api]);

  const handleDownload = async () => {
    const zip = new JSZip();

    try {
      const arcadeId = props.api?.data || "No_Arcade_ID";

      // Convert base64 QR Code to Blob for ZIP file
      const qrCodeBlob = await (await fetch(qrCodeSrc)).blob();
      zip.file("ArcadeId.bmp", qrCodeBlob, { binary: true });

      // Add ArcadeId in a .txt file
      const textContent = `Arcade API Key: ${arcadeId}`;
      zip.file("ArcadeId.txt", textContent);

      // Generate and trigger ZIP file download
      zip.generateAsync({ type: "blob" }).then((content) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(content);
        link.download = "arcade_files.zip";
        link.click();
      });
    } catch (error) {
      console.error("Error generating ZIP file:", error);
    }
  };

  return (

    <div className='ml-1 bg-white border border-black rounded-xl p-2 sm:p-5 sm:mt-7 sm:w-[420px] w-[300px] mb-5'>
              <h1 className='text-custom-headblue font-bold'>API Key:</h1>
              <div className="flex items-center justify-between gap-x-2 sm:gap-x-5 lg:gap-x-10">
                <p className='text-start sm:text-md text-xs sm:w-auto w-[50%] break-words overflow-y-auto'>
                {props.api ? props.api.data : "No API details available"}
                </p>
                {qrCodeSrc && (
                  <Image
                    src={`${qrCodeSrc}`}
                    height={80}
                    width={80}
                    alt="QR Code"
                    className='sm:w-[80px] sm:h-[80px] h-[80px] w-[80px]'
                  />
                )}
              </div>

              <button className="qr_button" onClick={handleDownload}>
           Download QR
        </button>
        <style jsx>
          {`
          .qr_button {
  align-self: flex-start; /* Align the button to the left */
  margin-top: 0.5rem; /* Add spacing above the button */
  background-color: #948af8;
  color: white;
  border: solid 1px #000;
  border-radius: 19px;
  cursor: pointer;
  font-size: 16px;
  padding: 2px 14px;
}

.qr-button:hover {
  background-color: #0056b3;
}
`}
        </style>
            </div>





    // <div className="block-section">
    //   <div className="text_container">
    //     <div className="text">
    //       <h3>API Key:</h3>
    //       <p>{props.api ? props.api.data : "No API details available"}</p>
    //     </div>
    //     <button className="qr_button" onClick={handleDownload}>
    //       Download QR
    //     </button>
    //   </div>
    //   <div className="image">
    //     {qrCodeSrc ? (
    //       <img src={qrCodeSrc} alt="QR Code" />
    //     ) : (
    //       <p>Loading QR Code...</p>
    //     )}
    //   </div>
    // </div>
  );
};

export default BlockSection;












