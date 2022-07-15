import React from "react";
import { Button } from "reactstrap";

function WordDocument2() {
  const ExportToDoc = (element, filename = "") => {
    var header =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";

    var footer = "</body></html>";

    var html = header + document.getElementById(element).innerHTML + footer;

    var blob = new Blob(["\ufeff", html], {
      type: "application/msword",
    });

    // Specify link url
    var url =
      "data:application/vnd.ms-word;charset=utf-8," + encodeURIComponent(html);

    // Specify file name
    filename = filename ? filename + ".doc" : "document.doc";

    // Create download link element
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // Create a link to the file
      downloadLink.href = url;

      // Setting the file name
      downloadLink.download = filename;

      //triggering the function
      downloadLink.click();
    }

    document.body.removeChild(downloadLink);

    // var header =
    //   "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
    //   "xmlns:w='urn:schemas-microsoft-com:office:word' " +
    //   "xmlns='http://www.w3.org/TR/REC-html40'>" +
    //   "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
    // var footer = "</body></html>";
    // var sourceHTML =
    //   header + document.getElementById(element).innerHTML + footer;

    // var source =
    //   "data:application/vnd.ms-word;charset=utf-8," +
    //   encodeURIComponent(sourceHTML);
    // var fileDownload = document.createElement("a");
    // document.body.appendChild(fileDownload);
    // fileDownload.href = source;

    // filename = filename ? filename + ".doc" : "document.doc";

    // fileDownload.download = filename;
    // fileDownload.click();
    // document.body.removeChild(fileDownload);
  };
  return (
    <div>
      <Button onClick={() => ExportToDoc("exportContent", "ramesh")}>
        Export as .doc
      </Button>
      <div id="exportContent">
        <h1>
          <center>CodersFever</center>
        </h1>
        <h2>Easy Learing Plateform</h2>
        <p>
          CodesFever emerged from the concept that there is a category of
          readers who respond best to online web content and prefer to learn new
          skills from the comforts of their drawing rooms at their own place.
        </p>
        <p>
          Individual, corporate and academic members have access to learn
          anything on codesfever.com likes video tutorials, blogs content etc.
          From many years, we worked our way to adding new fresh articles on
          topics ranging from programming languages that helps students,
          leaders, IT and design professionals, project managers or anyone who
          is working with software development, creatives and business skills.
        </p>
      </div>
    </div>
  );
}

export default WordDocument2;
