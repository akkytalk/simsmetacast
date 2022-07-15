import * as docx from "docx";
import { saveAs } from "file-saver";
import React from "react";
import { Button } from "reactstrap";
import { convertInchesToTwip, WidthType } from "docx";
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

function WordDocAdvanceDetail(props) {
  const ref_no = props.ref_no ?? "";
  const contact_no = props.contact_no ?? "";
  const advance_date = dateFormat(props.advance_date, "dd-mm-yyyy") ?? "";
  const advance = props.advance ?? "0.00 USD";
  const balance_advance = props.balance_advance ?? "0.00 USD";
  const advance_sent = props.advance_sent ?? "0.00 USD";

  const contract_details = props.contract_details ?? [
    {
      amount: "",
      pending: "",
      date: "",
      remarks: "",
    },
  ];

  console.log("contract_details", contract_details);
  const table = new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Our Ref.",

                    bold: true,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            width: {
              size: 50,
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
                alignment: AlignmentType.CENTER,
              }),
            ],
            width: {
              size: 50,
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
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "Contract No.",

                    bold: true,
                  }),
                ],
              }),
            ],
            width: {
              size: 50,
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
                text: contact_no,
                alignment: AlignmentType.CENTER,
              }),
            ],
            width: {
              size: 50,
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
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "Total Advance Amount",

                    bold: true,
                  }),
                ],
              }),
            ],
            width: {
              size: 50,
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
                alignment: AlignmentType.CENTER,
              }),
            ],
            width: {
              size: 50,
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
                children: [
                  new TextRun({
                    text: "Advance Sent",

                    bold: true,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            width: {
              size: 50,
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
                text: advance_sent,
                alignment: AlignmentType.CENTER,
              }),
            ],
            width: {
              size: 50,
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
                children: [
                  new TextRun({
                    text: "Balance Advance Amount",

                    bold: true,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            width: {
              size: 50,
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
                text: balance_advance,
                alignment: AlignmentType.CENTER,
              }),
            ],
            width: {
              size: 50,
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
                children: [
                  new TextRun({
                    text: "Last Advance Date",

                    bold: true,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            width: {
              size: 50,
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
                text: advance_date,
                alignment: AlignmentType.CENTER,
              }),
            ],
            width: {
              size: 50,
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
            new Paragraph({
              children: [
                new TextRun({
                  text: "With reference to above contract, Request you to please note that the advance has been sent as per following :",
                  bold: true,
                }),
              ],
              margins: {
                top: convertInchesToTwip(0.1),
                bottom: convertInchesToTwip(0.5),
                left: convertInchesToTwip(0.1),
                right: convertInchesToTwip(0.1),
              },
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: " ",
                }),
              ],
            }),
            table,
            new Paragraph({
              children: [
                new TextRun({
                  text: "Advance Details",
                  break: 1,
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "",
                }),
              ],
            }),
            table2,
          ],
        },
      ],
    });

    docx.Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, `advance detail-${ref_no}.docx`);
      console.log("Document created successfully");
    });
  };

  // console.log("table", table);

  return (
    <Button className="btn-success" onClick={() => generate()} block>
      <i className="fa fa-print mr-2" />

      {props.print ? "Print" : "Download"}
    </Button>
  );
}

export default WordDocAdvanceDetail;
