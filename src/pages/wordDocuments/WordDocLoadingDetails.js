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

function WordDocLoadingDetails(props) {
  const container =
    props.container?.length > 0
      ? props.container
      : [
          {
            container_no: "container no",
            seal_no: "seal no",
            commodity: props.commodity,
            quantity: 0,
          },
        ];
  const ref_no = props.ref_no ?? "";
  const contact_no = props.ctt_no ?? "";
  const etd = dateFormat(props.etd, "dd-mm-yyyy") ?? "";
  const vessel_name = props.vessel_name ?? "";
  const loading_port = props.loading_port ?? "";
  const eta = dateFormat(props.eta, "dd-mm-yyyy") ?? "";
  const bl_no = props.bl_no ?? "";
  const shipping_line = props.shipping_line ?? "";
  const discharge = props.discharge ?? "";
  const final_des = props.delivery ?? "";
  const commodity = props.commodity ?? "";
  const quantity = Number(props.quantity ?? 0).toFixed(2);
  const total_qty = Number(props.total_qty ?? 0).toFixed(2);

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
                    text: "Vessel Name",
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
                text: vessel_name,
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
                    text: "ETD",
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
                text: etd,
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
                    text: "Loading Port",
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
                text: loading_port,
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
                    text: "ETA",
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
                text: eta,
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
                    text: "BL No",
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
                text: bl_no,
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
                    text: "Shipping Line",
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
                text: shipping_line,
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
                    text: "Port of Discharge",
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
                text: discharge,
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
                    text: "Final Destination",
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
                text: final_des,
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

  const table_2 = new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Container No.",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.CENTER,
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
                children: [
                  new TextRun({
                    text: "Seal No.",

                    bold: true,
                  }),
                ],
              }),
            ],
            width: {
              size: 15,
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
                    text: "Commodity",
                    bold: true,
                  }),
                ],
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
                children: [
                  new TextRun({
                    text: "Gross Weight (MT)",

                    bold: true,
                  }),
                ],
              }),
            ],
            width: {
              size: 15,
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
                    text: "Tare Weight (MT)",
                    bold: true,
                  }),
                ],
              }),
            ],
            width: {
              size: 15,
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
                    text: "Net Weight (MT)",
                    bold: true,
                  }),
                ],
              }),
            ],
            width: {
              size: 15,
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
      ...container
        .map((container) => {
          return new TableRow({
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: container?.container_no,
                      }),
                    ],
                    alignment: AlignmentType.CENTER,
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
                    text: container?.seal_no,
                  }),
                ],
                width: {
                  size: 15,
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
                    text: commodity,
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
                    text: Number(container?.quantity ?? 0)?.toFixed(2),
                  }),
                ],
                width: {
                  size: 15,
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
                    text: Number(container?.quantity ?? 0)?.toFixed(2),
                  }),
                ],
                width: {
                  size: 15,
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
                    text: Number(container?.quantity ?? 0)?.toFixed(2),
                  }),
                ],
                width: {
                  size: 15,
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
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Total",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.CENTER,
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
                text: "",
              }),
            ],
            width: {
              size: 15,
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
                text: "",
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
                children: [
                  new TextRun({
                    text: total_qty,
                    bold: true,
                  }),
                ],
              }),
            ],
            width: {
              size: 15,
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
                    text: total_qty,
                    bold: true,
                  }),
                ],
              }),
            ],
            width: {
              size: 15,
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
                    text: total_qty,
                    bold: true,
                  }),
                ],
              }),
            ],
            width: {
              size: 15,
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

  const table_3 = new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Commodity",
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
            alignment: AlignmentType.CENTER,
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Quantity",
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
                    text: commodity,
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
            alignment: AlignmentType.CENTER,
            children: [
              new Paragraph({
                text: quantity,
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

  const generate = () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "With reference to the above contract, Request you to please note the loading details :",
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
                  text: " ",
                }),
              ],
            }),
            table_2,
            new Paragraph({
              children: [
                new TextRun({
                  text: " ",
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: " ",
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "Pending Quantity to be loaded:",
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
            table_3,
          ],
        },
      ],
    });

    docx.Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, `loading detail ${ref_no}.docx`);
      console.log("Document created successfully");
    });
  };

  return props.print ? (
    <Button className="btn-success" onClick={() => generate()} block>
      <i className="fa fa-print mr-2" />
      Print
    </Button>
  ) : (
    <Button className="btn-success" onClick={() => generate()}>
      <i className="fa fa-download mr-2" />
      Download
    </Button>
  );
}

export default WordDocLoadingDetails;
