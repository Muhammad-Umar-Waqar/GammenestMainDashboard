import React from 'react';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { useState } from 'react';

const DownloadButton = ({ api, qrCodeUrl, arcadeId }) => {
  const handleDownload = async () => {
    const zip = new JSZip();

    // Add ArcadeId.bmp (QR Code image)
    const qrCodeBlob = await fetch(qrCodeUrl).then(res => res.blob());
    zip.file('ArcadeId.bmp', qrCodeBlob);

    // Add ArcadeId.txt (text file with arcadeId)
    zip.file('ArcadeId.txt', `Arcade ID: ${arcadeId} \nAPI:  ${api}`);

    // Generate ZIP file
    zip.generateAsync({ type: 'blob' }).then(content => {
      saveAs(content, 'ArcadeFiles.zip');
    });
  };


   // Conditionally render the download button
   if (!api || !qrCodeUrl || !arcadeId) {
    return null; // Don't render the button if any of the necessary data is missing
  }

  
  return (

    <div>
    <button
    onClick={handleDownload}
    className="bg-custom-headblue mt-2 text-white py-1 px-6 rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                Download
              </button>
  </div>


  );
};

export default DownloadButton;
