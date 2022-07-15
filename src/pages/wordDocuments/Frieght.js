import * as docx from "docx";
import { saveAs } from "file-saver";
import React from "react";
import { Button } from "reactstrap";
import {
  convertInchesToTwip,
  TabStopPosition,
  TabStopType,
  VerticalAlign,
  WidthType,
} from "docx";
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

const tableDoc = ({ rows }) => {
  return new Table({
    rows: rows?.map(
      (row) =>
        new TableRow({
          children: row?.cell?.map(
            (c) =>
              new TableCell({
                children: c?.paragraph?.map(
                  (p) =>
                    new Paragraph({
                      children: p?.textRun?.map(
                        (t) =>
                          new TextRun({
                            text: t.text ?? "",
                            bold: t.bold,
                            fontSize: t.size ?? "",
                            underline: t.underline ?? "",
                            break: t.break ?? 0,
                          })
                      ),
                      alignment: p.alignment ?? AlignmentType.LEFT,
                      margins: {
                        top: convertInchesToTwip(p?.margin?.top ?? 0.04),
                        bottom: convertInchesToTwip(p?.margin?.bottom ?? 0.04),
                        left: convertInchesToTwip(p?.margin?.left ?? 0.04),
                        right: convertInchesToTwip(p?.margin?.right ?? 0.04),
                      },
                    })
                ),

                width: {
                  size: c.size,
                  type: WidthType.PERCENTAGE,
                },
                margins: {
                  top: convertInchesToTwip(c?.margin?.top ?? 0.04),
                  bottom: convertInchesToTwip(c?.margin?.bottom ?? 0.04),
                  left: convertInchesToTwip(c?.margin?.left ?? 0.04),
                  right: convertInchesToTwip(c?.margin?.right ?? 0.04),
                },
                verticalAlign: c.verticalAlign ?? "",
                columnSpan: c.columnSpan ?? 1,
                rowSpan: c.rowSpan ?? 1,
              })
          ),
        })
    ),

    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
  });
};

function Frieght(props) {
  const ref_no = props.ref_no ?? "";
  const supplier_name = props.supplier_name ?? "";
  const customer_name = props.customer_name ?? "";
  const customer_address = props.customer_address ?? "";
  const customer_pan = props.customer_pan ?? "";
  const customer_gst = props.customer_gst ?? "";
  const customer_iec = props.customer_iec ?? "";
  const customer_email = props.customer_email ?? "";

  const date = dateFormat(props.date, "dd-mm-yyyy");

  const invoice_no = props.invoice_no ?? "";
  const contract_no = props.contract_no ?? "";
  const port_of_loading = props.port_of_loading ?? "";
  const delivery = props.delivery ?? "";
  const bl_no = props.bl_no ?? "";
  const vessel_name = props.vessel_name ?? "";
  const eta = dateFormat(props.eta, "dd-mm-yyyy");
  const etd = dateFormat(props.etd, "dd-mm-yyyy");
  const ctn_size = props.ctn_size ?? "";
  const packageNo = props.packageNo ?? "1";
  const doc_description = props.doc_description ?? "";
  const no_of_container = props.no_of_container ?? "";
  const total_qty = Number(props.total_qty ?? 0).toFixed(2);

  const container =
    props.container?.length > 0
      ? props.container
      : [
          {
            container_no: "container no",
            seal_no: "seal no",
            ctn_size: props.ctn_size,
            quantity: 0,
          },
        ];

  // console.log("ctn_size", ctn_size);

  const table2 = tableDoc({
    rows: [
      {
        cell: [
          {
            paragraph: [
              {
                textRun: [
                  {
                    text: "aakash",
                    bold: false,
                  },
                ],
              },
            ],
            size: 40,
            margin: { top: 0.04, bottom: 0.04, left: 0.04, right: 0.04 },
            verticalAlign: VerticalAlign.CENTER,
          },
          {
            paragraph: [
              {
                textRun: [
                  {
                    text: "aakash",
                    bold: true,
                  },
                ],
              },
            ],
            size: 40,
            margin: { top: 0.04, bottom: 0.04, left: 0.04, right: 0.04 },
            verticalAlign: VerticalAlign.CENTER,
          },
          {
            paragraph: [
              {
                textRun: [
                  {
                    text: "anirudha",
                    bold: true,
                  },
                ],
              },
            ],
            size: 20,
            margin: { top: 0.04, bottom: 0.04, left: 0.04, right: 0.04 },
            verticalAlign: VerticalAlign.CENTER,
          },
        ],
      },
      {
        cell: [
          {
            paragraph: [
              {
                textRun: [
                  {
                    text: "ruchir",
                    bold: false,
                  },
                  {
                    text: "pagal",
                    bold: false,
                  },
                ],
              },
            ],
            size: 40,
            margin: { top: 0.04, bottom: 0.04, left: 0.04, right: 0.04 },
            verticalAlign: VerticalAlign.CENTER,
          },
          {
            paragraph: [
              {
                textRun: [
                  {
                    text: "aditya",
                    bold: false,
                  },
                  {
                    text: "udit",
                    bold: false,
                  },
                ],
              },
            ],
            size: 40,
            margin: { top: 0.04, bottom: 0.04, left: 0.04, right: 0.04 },
            verticalAlign: VerticalAlign.CENTER,
          },
          {
            paragraph: [
              {
                textRun: [
                  {
                    text: "atul",
                    bold: false,
                  },
                  {
                    text: "prajapati",
                    bold: false,
                  },
                ],
              },
            ],
            size: 20,
            margin: { top: 0.04, bottom: 0.04, left: 0.04, right: 0.04 },
            verticalAlign: VerticalAlign.CENTER,
          },
        ],
      },
    ],
  });

  const table3 = new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Port of Loading",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.LEFT,
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
                    text: `${port_of_loading}`,
                  }),
                ],
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
                    text: "B/L #",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.LEFT,
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
                    text: `${bl_no}`,
                  }),
                ],
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

      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Destination Port",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.LEFT,
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
                    text: `${delivery}`,
                  }),
                ],
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
                    text: "ETD",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.LEFT,
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
                    text: `${etd}`,
                  }),
                ],
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
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Vessel",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.LEFT,
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
                    text: `${vessel_name}`,
                  }),
                ],
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
                    text: "ETA",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.LEFT,
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
                    text: `${eta}`,
                  }),
                ],
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
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "MATERIAL ORIGIN",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.LEFT,
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
                    text: ``,
                  }),
                ],
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
                    text: "WOOD",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.LEFT,
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
                    text: `NO`,
                  }),
                ],
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
    ],

    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
  });

  const table = new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "CONTAINER#",
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
                    text: "SEAL#",

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
                    text: "CTN SIZE",
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
                    text: "PACKING DETAILS",

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
                    text: "GROSS WT",
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
                    text: "NET WT",
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
                    text: `${ctn_size}'`,
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
                    text: `${packageNo} Package(s)`,
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
                    text: "Packing:",
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
                text: `${packageNo} x ${ctn_size}' Container(s)`,
              }),
            ],
            width: {
              size: 35,
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
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Total:",
                    bold: true,
                    underline: {},
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
                    underline: {},
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
                    underline: {},
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
  const generate = () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "FREIGHT CERTIFICATE",
                  bold: true,
                }),
              ],
              margins: {
                top: convertInchesToTwip(0.1),
                bottom: convertInchesToTwip(0.5),
                left: convertInchesToTwip(0.1),
                right: convertInchesToTwip(0.1),
              },
              alignment: AlignmentType.CENTER,
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: `Date: ${date}`,
                }),
                new TextRun({
                  text: `Invoice No.: ${invoice_no}`,
                  break: 1,
                }),
                new TextRun({
                  text: `Contract No. ${contract_no}`,
                  break: 1,
                }),
              ],
              margins: {
                top: convertInchesToTwip(0.1),
                bottom: convertInchesToTwip(0.5),
                left: convertInchesToTwip(0.1),
                right: convertInchesToTwip(0.1),
              },
              alignment: AlignmentType.RIGHT,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Buyer: `,
                  bold: true,
                }),
              ],
              margins: {
                top: convertInchesToTwip(0.1),
                bottom: convertInchesToTwip(0.5),
                left: convertInchesToTwip(0.1),
                right: convertInchesToTwip(0.1),
              },
              alignment: AlignmentType.LEFT,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `${customer_name} `,
                  bold: true,
                }),
                new TextRun({
                  text: `${customer_address} `,
                  break: 1,
                }),
                new TextRun({
                  text: `PAN: ${customer_pan} `,
                  break: 1,
                }),
                new TextRun({
                  text: `GST NO. ${customer_gst} `,
                  break: 1,
                }),
                new TextRun({
                  text: `IEC: ${customer_iec} `,
                  break: 1,
                }),
                new TextRun({
                  text: `${customer_email}`,
                  break: 1,
                }),
              ],
              margins: {
                top: convertInchesToTwip(0.1),
                bottom: convertInchesToTwip(0.5),
                left: convertInchesToTwip(0.1),
                right: convertInchesToTwip(0.1),
              },
              alignment: AlignmentType.LEFT,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: ``,
                  break: 1,
                }),
              ],
            }),
            table3,

            new Paragraph({
              children: [
                new TextRun({
                  text: " ",
                  break: 1,
                }),
              ],
            }),
            table,
            new Paragraph({
              children: [
                new TextRun({
                  text: " ",
                  break: 1,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `This is to certify that against BL No# ${bl_no} containing ${packageNo} x ${ctn_size}' Container(s)we have paid ocean freight from to ${delivery}, port of discharge at origin destination charges, i.e. IHC and local charges, will be borne by consignee at ${delivery}.`,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Name of Shipper: ${supplier_name}`,
                  break: 2,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Name of Consignee: ${customer_name}`,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Number of Containers: ${no_of_container}`,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Commodity: ${doc_description}`,
                }),
              ],
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: `${customer_name}`,
                  break: 2,
                }),
              ],
              margins: {
                top: convertInchesToTwip(0.1),
                bottom: convertInchesToTwip(0.5),
                left: convertInchesToTwip(0.1),
                right: convertInchesToTwip(0.1),
              },
              alignment: AlignmentType.LEFT,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `_____________________________`,
                  break: 4,
                }),
              ],
              margins: {
                top: convertInchesToTwip(0.1),
                bottom: convertInchesToTwip(0.5),
                left: convertInchesToTwip(0.1),
                right: convertInchesToTwip(0.1),
              },
              alignment: AlignmentType.LEFT,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Authorized Signature`,
                }),
              ],
              margins: {
                top: convertInchesToTwip(0.1),
                bottom: convertInchesToTwip(0.5),
                left: convertInchesToTwip(0.1),
                right: convertInchesToTwip(0.1),
              },
              alignment: AlignmentType.LEFT,
            }),
          ],
        },
      ],
    });

    docx.Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, `print_freight_certificate_${ref_no}.docx`);
      console.log("Document created successfully");
    });
  };

  return (
    <Button className="btn p-2" onClick={() => generate()}>
      <i className="fa fa-file-word mr-2" />
      Freight certificate
    </Button>
  );
}

export default Frieght;
