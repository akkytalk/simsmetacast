import * as docx from "docx";
import { saveAs } from "file-saver";
import React from "react";
import { Button } from "reactstrap";
import { convertInchesToTwip, VerticalAlign, WidthType } from "docx";
import dateFormat from "dateformat";

const {
  Document,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  AlignmentType,
} = docx;

function WordDocSalesContract2({ purchaseSalesIndentData, ...props }) {
  const ref_no = props.ref_no ?? "";
  const supplier = props.supplier ?? "";
  const ctt_no = props.ctt_no ?? "ctt_no";
  const date = dateFormat(Date(), "dd-mm-yyyy");
  const advance = props.advance ? props.advance : 0;
  const bank_name = props.bank_name ?? "";
  const bank_address = props.bank_address ?? "";
  const account_no = props.account_no ?? "account no";
  const ifsc_code = props.ifsc_code ?? "ifsc code";
  const swift_no = props.swift_no ?? "swift no";
  const iban_no = props.iban_no ?? "iban no";
  const contact_person = props.contact_person ?? "contact person";
  const phone_no = props.phone_no ?? "phone no";
  const contract_details = props.contract_details ?? [
    {
      amount: "",
      pending: "",
      date: "",
      remarks: "",
    },
  ];

  console.log("purchaseSalesIndentData", purchaseSalesIndentData);

  const table = new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "SALE CONTRACT INDENT CONFIRMATION",
                    bold: true,
                  }),
                ],
              }),
            ],
            verticalAlignment: AlignmentType.CENTER,
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
            columnSpan: 2,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                text: "OUR REF.",
              }),
            ],
            width: {
              size: 20,
              type: WidthType.PERCENTAGE,
            },
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
          }),
          new TableCell({
            children: [
              new Paragraph({
                text: ref_no,
              }),
            ],
            width: {
              size: 80,
              type: WidthType.PERCENTAGE,
            },
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                text: "SUPPLIER",
              }),
            ],
            width: {
              size: 20,
              type: WidthType.PERCENTAGE,
            },
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
          }),
          new TableCell({
            children: [
              new Paragraph({
                text: supplier,
              }),
            ],
            width: {
              size: 80,
              type: WidthType.PERCENTAGE,
            },
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                text: "CTT NO.",
              }),
            ],
            width: {
              size: 20,
              type: WidthType.PERCENTAGE,
            },
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
          }),
          new TableCell({
            children: [
              new Paragraph({
                text: ctt_no,
              }),
            ],
            width: {
              size: 80,
              type: WidthType.PERCENTAGE,
            },
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                text: "DATE",
              }),
            ],
            width: {
              size: 20,
              type: WidthType.PERCENTAGE,
            },
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
          }),
          new TableCell({
            children: [
              new Paragraph({
                text: date,
              }),
            ],
            width: {
              size: 80,
              type: WidthType.PERCENTAGE,
            },
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                text: "ADVANCE",
              }),
            ],
            width: {
              size: 20,
              type: WidthType.PERCENTAGE,
            },
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
          }),
          new TableCell({
            children: [
              new Paragraph({
                text: advance,
              }),
            ],
            width: {
              size: 80,
              type: WidthType.PERCENTAGE,
            },
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                text: "BANK DETAIL",
              }),
            ],
            width: {
              size: 20,
              type: WidthType.PERCENTAGE,
            },
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "BANK NAME: ",
                    bold: true,
                  }),
                  new TextRun({
                    text: bank_name,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "BRANCH ADDRESS: ",
                    bold: true,
                  }),
                  new TextRun({
                    text: bank_address,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "ACCOUNT NUMBER: ",
                    bold: true,
                  }),
                  new TextRun({
                    text: account_no,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "IFSC CODE: ",
                    bold: true,
                  }),
                  new TextRun({
                    text: ifsc_code,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "SWIFT NO.: ",
                    bold: true,
                  }),
                  new TextRun({
                    text: swift_no,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "IBAN NO: ",
                    bold: true,
                  }),
                  new TextRun({
                    text: iban_no,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "CONTACT PERSON: ",
                    bold: true,
                  }),
                  new TextRun({
                    text: contact_person,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "PHONE NUMBER: ",
                    bold: true,
                  }),
                  new TextRun({
                    text: phone_no,
                  }),
                ],
              }),
            ],
            width: {
              size: 80,
              type: WidthType.PERCENTAGE,
            },
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
          }),
        ],
      }),
    ],
    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
  });

  const table2 = new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Advance Date",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            width: {
              size: 25,
              type: WidthType.PERCENTAGE,
            },
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Advance Amount",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            width: {
              size: 25,
              type: WidthType.PERCENTAGE,
            },
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Pending Advance",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            width: {
              size: 25,
              type: WidthType.PERCENTAGE,
            },
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Remarks",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            width: {
              size: 25,
              type: WidthType.PERCENTAGE,
            },
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
          }),
        ],
      }),
      ...contract_details
        .map((con) => {
          return new TableRow({
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: dateFormat(con.date ?? "", "dd/mm/yyyy"),
                      }),
                    ],
                    alignment: AlignmentType.CENTER,
                  }),
                ],
                width: {
                  size: 25,
                  type: WidthType.PERCENTAGE,
                },
                margins: {
                  top: convertInchesToTwip(0.04),
                  bottom: convertInchesToTwip(0.04),
                  left: convertInchesToTwip(0.04),
                  right: convertInchesToTwip(0.04),
                },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: con.amount + " USD",
                      }),
                    ],
                    alignment: AlignmentType.CENTER,
                  }),
                ],
                width: {
                  size: 25,
                  type: WidthType.PERCENTAGE,
                },
                margins: {
                  top: convertInchesToTwip(0.04),
                  bottom: convertInchesToTwip(0.04),
                  left: convertInchesToTwip(0.04),
                  right: convertInchesToTwip(0.04),
                },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: con.pending + " USD",
                      }),
                    ],
                    alignment: AlignmentType.CENTER,
                  }),
                ],
                width: {
                  size: 25,
                  type: WidthType.PERCENTAGE,
                },
                margins: {
                  top: convertInchesToTwip(0.04),
                  bottom: convertInchesToTwip(0.04),
                  left: convertInchesToTwip(0.04),
                  right: convertInchesToTwip(0.04),
                },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: con.remark,
                      }),
                    ],
                    alignment: AlignmentType.CENTER,
                  }),
                ],
                width: {
                  size: 25,
                  type: WidthType.PERCENTAGE,
                },
                margins: {
                  top: convertInchesToTwip(0.04),
                  bottom: convertInchesToTwip(0.04),
                  left: convertInchesToTwip(0.04),
                  right: convertInchesToTwip(0.04),
                },
              }),
            ],
          });
        })
        .reduce((prev, curr) => prev.concat(curr), []),
    ],
    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
  });

  const generate = () => {
    const doc = new Document({
      sections: [
        {
          children: [
            table,
            // new Paragraph({
            //   children: [
            //     new TextRun({
            //       text: "Advance Details",
            //       break: 1,
            //       bold: true,
            //     }),
            //   ],
            // }),
            // new Paragraph({
            //   children: [
            //     new TextRun({
            //       text: "",
            //     }),
            //   ],
            // }),
            // table2,
          ],
        },
      ],
    });

    docx.Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, `sales contract indent- ${ref_no}.docx`);
      console.log("Document created successfully");
    });
  };

  return (
    <Button className="btn-success" onClick={() => generate()} block>
      <i className="fa fa-print mr-2" />

      {props.print ? "Print" : "Download"}
    </Button>
  );
}

export default WordDocSalesContract2;
