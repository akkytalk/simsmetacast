import React, { useState } from "react";
import {
  Button,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";

function WordDocSalesContract(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const ExportToDoc = (element, filename = "") => {
    // var header =
    //   "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";

    // var footer = "</body></html>";

    // var html = header + document.getElementById(element).innerHTML + footer;

    // var blob = new Blob(["\ufeff", html], {
    //   type: "application/msword",
    // });

    // // Specify link url
    // var url =
    //   "data:application/vnd.ms-word;charset=utf-8," + encodeURIComponent(html);

    // // Specify file name
    // filename = filename ? filename + ".doc" : "document.doc";

    // // Create download link element
    // var downloadLink = document.createElement("a");

    // document.body.appendChild(downloadLink);

    // if (navigator.msSaveOrOpenBlob) {
    //   navigator.msSaveOrOpenBlob(blob, filename);
    // } else {
    //   // Create a link to the file
    //   downloadLink.href = url;

    //   // Setting the file name
    //   downloadLink.download = filename;

    //   //triggering the function
    //   downloadLink.click();
    // }

    // document.body.removeChild(downloadLink);

    var header =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
      "xmlns:w='urn:schemas-microsoft-com:office:word' " +
      "xmlns='http://www.w3.org/TR/REC-html40'>" +
      "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
    var footer = "</body></html>";
    var sourceHTML =
      header + document.getElementById(element).innerHTML + footer;

    var source =
      "data:application/vnd.ms-word;charset=utf-8," +
      encodeURIComponent(sourceHTML);
    var fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;

    filename = filename ? filename + ".doc" : "document.doc";

    fileDownload.download = filename;
    fileDownload.click();
    document.body.removeChild(fileDownload);
  };

  return (
    <div>
      <Button
        className="bg-gradient-info text-white mr-2"
        onClick={() => toggle()}
        block
      >
        <i className="fa fa-print mr-2" />

        {props.print ? "Print" : "Download"}
      </Button>
      <Modal className="modal-lg" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="d-flex align-items-center">
          SALE CONTRACT INDENT
        </ModalHeader>
        <ModalBody className="">
          <div id="exportContent">
            <div style={{ fontSize: "12px" }}>
              <h5
                style={{
                  border: "1px solid black",
                  textAlign: "center",
                  margin: "0",
                }}
              >
                SALE CONTRACT INDENT CONFIRMATION
              </h5>
              <table
                className="table table-sm"
                style={{ display: "flex" }}
                className="flex"
              >
                <tr
                  style={{
                    // border: "1px solid black",
                    display: "flex",
                    flexFlow: "column",
                    width: "30%",
                  }}
                  className="flex w-30"
                >
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "5px",
                      height: "35px",
                    }}
                  >
                    OUR REF.
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "5px",
                      height: "35px",
                    }}
                  >
                    SUPPLIER
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "5px",
                      height: "35px",
                    }}
                  >
                    CTT NO.
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "5px",
                      height: "35px",
                    }}
                  >
                    DATE
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "5px",
                      height: "35px",
                    }}
                  >
                    ADVANCE
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "5px",
                      height: "90%",
                      display: "flex",
                      // justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    BANK DETAIL
                  </td>
                </tr>
                <tr
                  style={{
                    // border: "1px solid black",
                    display: "flex",
                    flexFlow: "column",
                    width: "70%",
                  }}
                  className="flex w-70"
                >
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "5px",
                      height: "35px",
                    }}
                  >
                    Ref No.
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "5px",
                      height: "35px",
                    }}
                  >
                    SUPPLIER Name
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "5px",
                      height: "35px",
                    }}
                  >
                    CTT NO.
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "5px",
                      height: "35px",
                    }}
                  >
                    DATE of
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "5px",
                      height: "35px",
                    }}
                  >
                    654878
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "5px",
                      height: "90%",
                      display: "flex",
                      flexFlow: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <div style={{ fontWeight: "bold", paddingRight: "5px" }}>
                        BANK NAME:{" "}
                      </div>
                      <div> STATE BANK</div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div style={{ fontWeight: "bold", paddingRight: "5px" }}>
                        BRANCH ADDRESS:{" "}
                      </div>
                      <div> C/LOACES 7Y9-03.300 ORIHUELA, ALICANTE, SPAIN</div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div style={{ fontWeight: "bold", paddingRight: "5px" }}>
                        ACCOUNT NUMBER:{" "}
                      </div>
                      <div>00303324660200012278</div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div style={{ fontWeight: "bold", paddingRight: "5px" }}>
                        IFSC CODE:{" "}
                      </div>
                      <div>54757777564</div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div style={{ fontWeight: "bold", paddingRight: "5px" }}>
                        SWIFT NO.:{" "}
                      </div>
                      <div>BSCHESMMXXX</div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div style={{ fontWeight: "bold", paddingRight: "5px" }}>
                        IBAN NO:{" "}
                      </div>
                      <div>ES38 0030 3324 6602 0001 2278</div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div style={{ fontWeight: "bold", paddingRight: "5px" }}>
                        CONTACT PERSON:{" "}
                      </div>
                      <div>Aakash</div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div style={{ fontWeight: "bold", paddingRight: "5px" }}>
                        PHONE NUMBER:{" "}
                      </div>
                      <div>4576548748</div>
                    </div>
                  </td>
                </tr>
              </table>
              {/* <table
                className="table table-sm"
                style={{ border: "1px solid black", padding: "0" }}
              >
                <tbody className="test">
                  <tr className="test">
                    <td>OUR REF</td>
                    <td>Ref no</td>
                  </tr>
                  <tr className="test">
                    <td>SUPPLIER</td>
                    <td>VIKASH</td>
                  </tr>
                  <tr className="test">
                    <td>CTT NO</td>
                    <td>1456</td>
                  </tr>
                  <tr className="test">
                    <td>DATE</td>
                    <td>16-02-2022</td>
                  </tr>
                </tbody>
              </table> */}
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="w-100">
          <Row className="w-100" style={{ justifyContent: "center" }}>
            <Col md={3}>
              <Button
                className="bg-gradient-info text-white mr-2"
                onClick={() => ExportToDoc("exportContent", "Sale Contract")}
                block
              >
                <i className="fa fa-print mr-2" />
                {props.print ? "Print" : "Download"}
              </Button>
            </Col>
            <Col md={3}>
              <Button
                className="bg-gradient-danger text-white"
                onClick={() => setModal(false)}
                block
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default WordDocSalesContract;
