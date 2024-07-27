import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Certificate = () => {


    const downloadCertificate = () => {
        const input = document.getElementById('certificate');
        html2canvas(input).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4');
          
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          const padding = 10; // 10mm padding
    
          const imgProps = pdf.getImageProperties(imgData);
          const imgWidth = pdfWidth - 2 * padding;
          const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
    
          pdf.addImage(imgData, 'PNG', padding, padding, imgWidth, imgHeight);
          pdf.save('certificate.pdf');
        });
      };

  return (
    <div className="certificate-container p-4">
      <div className="certificate-content p-4" id="certificate">
        <div className="certificate-header">
          <img src="assets/govind.png" alt="Government Logo" className="govt-logo" />
          <h1>Government of India</h1>
        </div>
        <div className="certificate-body">
          <h2>Certificate of Approval</h2>
          <p>This is to certify that...</p>
        </div>
        <div className="certificate-footer">
          <div className="signatures">
            <div className="signature">
              <p>Authority 1</p>
            </div>
            <div className="signature">
              <p>Authority 2</p>
            </div>
          </div>
        </div>
      </div>
      <button onClick={downloadCertificate} className="download-button">Download Certificate</button>
    </div>
  );
};

export default Certificate;
