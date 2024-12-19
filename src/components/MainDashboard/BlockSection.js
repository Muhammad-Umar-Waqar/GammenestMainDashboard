import React, { useState, useEffect } from "react";
import JSZip from "jszip";
import QRCode from "qrcode";

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
      const textContent = `ArcadeId: ${arcadeId}`;
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
    <div className="block-section">
      <div className="text_container">
        <div className="text">
          <h3>API Key:</h3>
          <p>{props.api ? props.api.data : "No API details available"}</p>
        </div>
        <button className="qr_button" onClick={handleDownload}>
          Download QR
        </button>
      </div>
      <div className="image">
        {qrCodeSrc ? (
          <img src={qrCodeSrc} alt="QR Code" />
        ) : (
          <p>Loading QR Code...</p>
        )}
      </div>
    </div>
  );
};

export default BlockSection;












