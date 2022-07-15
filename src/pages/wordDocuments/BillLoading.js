import * as docx from "docx";
import { saveAs } from "file-saver";
import React from "react";
import { Button } from "reactstrap";
import {
  convertInchesToTwip,
  TabStopPosition,
  TabStopType,
  UnderlineType,
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

function BillLoading(props) {
  const ref_no = props.ref_no ?? "";
  const supplier_name = props.supplier_name ?? "";
  const supplier_address = props.supplier_address ?? "";
  const supplier_contact_person = props.supplier_contact_person ?? "";
  const supplier_tel = props.supplier_tel ?? "";
  const invoice_no = props.invoice_no ?? "";
  const customer_name = props.customer_name ?? "";
  const customer_address = props.customer_address ?? "";
  const customer_iec = props.customer_iec ?? "";
  const customer_gst = props.customer_gst ?? "";
  const customer_pan = props.customer_pan ?? "";
  const customer_email = props.customer_email ?? "";
  const customer_tel = props.customer_tel ?? "";
  const customer_contact_person = props.customer_contact_person ?? "";
  const bill_of_loading = props.bill_of_loading ?? "";
  const discharge = props.discharge ?? "";
  const no_of_container = props.no_of_container ?? "";
  const port_of_loading = props.port_of_loading ?? "";
  const delivery = props.delivery ?? "";
  const doc_description = props.doc_description ?? "";
  const total_qty = Number(props.total_qty ?? 0).toFixed(2);
  const hs_code = props.hs_code ?? "";
  const received_quantity = props.received_quantity ?? "";
  const basel_no = props.basel_no ?? "";
  const ctt_size = props.ctt_size ?? "";

  const shipping_line = props.shipping_line ?? "";

  const container =
    props.container?.length > 0
      ? props.container
      : [
          {
            container_no: "",
            seal_no: "",
            quantity: 0,
          },
        ];

  const table = new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "",
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
            columnSpan: 2,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "BILL OF LADING No.",
                    bold: true,
                    size: 18,
                  }),
                  new TextRun({
                    text: "\tXXXXXXXXXXXXXX",
                    bold: true,
                    size: 18,
                  }),
                ],
              }),

              new Paragraph({
                children: [
                  new TextRun({
                    text: "DRAFT",
                    bold: true,
                    break: 1,
                    underline: {},
                    size: 18,
                  }),
                  new TextRun({
                    text: "\tPort-to-Port or Combined Transport (see Clause 1)",
                    bold: true,
                    size: 18,
                  }),
                ],
              }),

              new Paragraph({
                children: [
                  new TextRun({
                    text: "NO. & SEQUENCE OF ORIGINAL B/L's",
                    break: 1,
                    size: 18,
                  }),
                  new TextRun({
                    text: "\t NO. OF RIDER PAGES",
                    bold: true,
                    size: 18,
                  }),
                ],
              }),

              new Paragraph({
                children: [
                  new TextRun({
                    text: "",
                    break: 1,
                  }),
                  new TextRun({
                    text: "0",
                    size: 18,
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
            columnSpan: 1,
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
                    text: "SHIPPER:",
                  }),
                  new TextRun({
                    text: `${supplier_name}`,
                    break: 1,
                  }),
                  new TextRun({
                    text: `${supplier_address}`,
                    break: 1,
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
            columnSpan: 2,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "",
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
            columnSpan: 1,
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
                    text: "CONSIGNEE:",
                  }),
                  new TextRun({
                    text: `${customer_name}`,
                    break: 1,
                  }),
                  new TextRun({
                    text: `${customer_address}`,
                    break: 1,
                  }),
                  new TextRun({
                    text: `GST ${customer_gst} / IEC: ${customer_iec}`,
                    break: 1,
                  }),
                  new TextRun({
                    text: `PAN - ${customer_pan} / `,
                    break: 1,
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
            columnSpan: 2,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "",
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
            columnSpan: 1,
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
                    text: "NOTIFY PARTIES:",
                  }),
                  new TextRun({
                    text: `${customer_name}`,
                    break: 1,
                  }),
                  new TextRun({
                    text: `${customer_address}`,
                    break: 1,
                  }),
                  new TextRun({
                    text: `GST ${customer_gst} / IEC: ${customer_iec}`,
                    break: 1,
                  }),
                  new TextRun({
                    text: `PAN - ${customer_pan} / `,
                    break: 1,
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
            columnSpan: 2,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "",
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
            columnSpan: 1,
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
                    text: "VESSEL & VOYAGE NO. (see",
                  }),
                  new TextRun({
                    text: `Clauses 8 & 9)`,
                    break: 1,
                  }),
                  new TextRun({
                    text: `EXPRESS ROME`,
                    break: 1,
                  }),
                ],
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
            columnSpan: 1,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `PORT OF LOADING ${port_of_loading}`,
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
            columnSpan: 1,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "PLACE OF RECEIPT: (Combined Transport ONLY - see Clauses 1 & 5.2)",
                  }),
                  new TextRun({
                    text: "XXXXXXXXXXXXXXXXXXXX",
                    break: 1,
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
            columnSpan: 1,
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
                    text: `BOOKING REF. (Or) SHIPPER'S REF`,
                  }),
                  new TextRun({
                    text: `${ref_no}`,
                    break: 1,
                    bold: true,
                  }),
                ],
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
            columnSpan: 1,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `. PORT OF DISCHARGE  ${discharge}  `,
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
            columnSpan: 1,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `PLACE OF DELIVERY: (Combined Transport ONLY - see Clauses 1 & 5.2) `,
                  }),
                  new TextRun({
                    text: `${delivery}`,
                    break: 1,
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
            columnSpan: 1,
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
                    text: `P A R T I C U L A R S F U R N I S H E D B Y T H E S H I P P E R - N O T C H E C K E D B Y C A R R I E R - C A R R I E R N O T R E S P O N S I B L E (see Clause 14) `,
                  }),
                ],
              }),
            ],
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
            columnSpan: 4,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: container?.map((c, i) => {
                  return new TextRun({
                    text: `${c.container_no}`,
                    bold: true,
                  });
                }),
              }),
              new Paragraph({
                children: container?.map((c, i) => {
                  return new TextRun({
                    text: `${c.seal_no}`,
                    bold: true,
                  });
                }),
              }),
            ],
            width: {
              size: 30,
              type: WidthType.PERCENTAGE,
            },
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
            columnSpan: 1,
          }),

          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "Description of Packages and Goods ",
                    bold: true,
                  }),
                  new TextRun({
                    text: "(Continued on attached Bill of Lading Rider page(s), if applicable)",
                    break: 1,
                  }),
                ],
              }),
            ],
            width: {
              size: 40,
              type: WidthType.PERCENTAGE,
            },
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
            columnSpan: 1,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Gross Cargo Weight",
                    bold: true,
                  }),
                ],
              }),
            ],
            width: {
              size: 10,
              type: WidthType.PERCENTAGE,
            },
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
            columnSpan: 1,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Measurement",
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
            columnSpan: 1,
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
                    text: "Container Number All seal numbers",
                  }),
                ],
              }),
            ],
            width: {
              size: 30,
              type: WidthType.PERCENTAGE,
            },
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
            columnSpan: 1,
            rowSpan: 4,
          }),

          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `CONTAINER SIZE: '${ctt_size}'`,
                    bold: true,
                  }),
                  new TextRun({
                    text: `Material Description: ${doc_description} `,
                    break: 1,
                  }),
                  new TextRun({
                    text: `HS-NO: ${hs_code}`,
                    break: 2,
                  }),

                  new TextRun({
                    text: `NET WT: ${total_qty} MT`,
                    break: 1,
                  }),

                  new TextRun({
                    text: `Continued from Carrier's Agents' Endorsements`,
                    break: 1,
                    size: 10,
                  }),

                  new TextRun({
                    text: `Lloyds/Imo number = 9333395`,
                    break: 2,
                    size: 10,
                  }),

                  new TextRun({
                    text: `FREIGHT PREPAID`,
                    break: 1,
                    bold: true,
                  }),

                  new TextRun({
                    text: `14 DAYS FREE DETENTION`,
                    break: 1,
                    bold: true,
                  }),

                  new TextRun({
                    text: `TERMINAL HANDLING CHARGES AND CONTAINER DEMURRAGE CHARGES PAYABLE AS PER LINE'S TARIFF. 
                    `,
                    break: 1,
                  }),
                ],
              }),
            ],
            width: {
              size: 40,
              type: WidthType.PERCENTAGE,
            },
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
            columnSpan: 1,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `KGS ${total_qty} MT`,
                  }),
                ],
              }),
            ],
            width: {
              size: 10,
              type: WidthType.PERCENTAGE,
            },
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
            columnSpan: 1,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "CBM 0",
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
            columnSpan: 1,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: `CARGO GROSS WEIGHT`,
                  }),
                ],
              }),
            ],
            width: {
              size: 40,
              type: WidthType.PERCENTAGE,
            },
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
            columnSpan: 1,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: ` ${total_qty} MT`,
                  }),
                ],
              }),
            ],
            width: {
              size: 10,
              type: WidthType.PERCENTAGE,
            },
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
            columnSpan: 1,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "",
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
            columnSpan: 1,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: `CONTAINER TARA`,
                  }),
                ],
              }),
            ],
            width: {
              size: 40,
              type: WidthType.PERCENTAGE,
            },
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
            columnSpan: 1,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `0`,
                  }),
                ],
              }),
            ],
            width: {
              size: 10,
              type: WidthType.PERCENTAGE,
            },
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
            columnSpan: 1,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "",
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
            columnSpan: 1,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: `TOTAL CONTAINER WEIGHT`,
                  }),
                ],
              }),
            ],
            width: {
              size: 40,
              type: WidthType.PERCENTAGE,
            },
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
            columnSpan: 1,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: ` ${total_qty} MT`,
                  }),
                ],
              }),
            ],
            width: {
              size: 10,
              type: WidthType.PERCENTAGE,
            },
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
            columnSpan: 1,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "",
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
            columnSpan: 1,
          }),
        ],
      }),
    ],
    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
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
                    text: "FREIGHT & CHARGES Cargo shall not be delivered unless Freight & Charges are paid (see Clause 16)",
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
            columnSpan: 2,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "",
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
            columnSpan: 1,
            rowSpan: 2,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({}),
              new Paragraph({}),
              new Paragraph({}),
              new Paragraph({}),
              new Paragraph({}),
              new Paragraph({}),
              new Paragraph({}),
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
            columnSpan: 2,
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
                    text: `DECLARED VALUE (only applicable if Ad Valorem Charges paid - see Clause 7.3) XXXXXXXXXXXXXXXXXXXX `,
                  }),
                ],
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
            columnSpan: 1,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `CARRIER'S RECEIPT (No. of Cntrs or Pkgs rcvd by Carrier - see Clause 14.1) 1`,
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
            columnSpan: 1,
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
              size: 50,
              type: WidthType.PERCENTAGE,
            },
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
            columnSpan: 1,
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
                    text: `PLACE AND DATE OF ISSUE`,
                  }),
                ],
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
            columnSpan: 1,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `SHIPPED ON BOARD DATE`,
                  }),
                  new TextRun({
                    text: `MUST BE BEFORE XYZ DATE`,
                    bold: true,
                    break: 1,
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
            columnSpan: 1,
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
              size: 50,
              type: WidthType.PERCENTAGE,
            },
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
            columnSpan: 1,
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
                  text: "BL FORMAT",
                  bold: true,
                }),
              ],
              alignment: AlignmentType.CENTER,
              margins: {
                top: convertInchesToTwip(0.1),
                bottom: convertInchesToTwip(1),
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
            new Paragraph({}),
            table2,
            new Paragraph({}),
            table3,
          ],
        },
      ],
    });

    docx.Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, `Bill_Loading_${ref_no}.docx`);
      console.log("Document created successfully");
    });
  };

  return (
    <Button className="btn p-2" onClick={() => generate()}>
      <i className="fa fa-file-word mr-2" />
      Bill Loading
    </Button>
  );
}

export default BillLoading;
