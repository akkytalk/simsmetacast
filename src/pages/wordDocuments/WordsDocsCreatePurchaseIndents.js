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

function WordsDocsCreatePurchaseIndents({ purchaseSalesIndentData, ...props }) {
  const commodity_details = [
    {
      commodity: props.commodity ?? "",
      price: props.price ?? "0",
      quantity: props.quantity ?? "",
      quality: props.quality ?? "0",
    },
    {
      commodity: "",
      price: "",
      quantity: "",
      quality: "",
    },
    {
      commodity: "",
      price: "",
      quantity: "",
      quality: "",
    },
    {
      commodity: "",
      price: "",
      quantity: "",
      quality: "",
    },
    {
      commodity: "",
      price: "",
      quantity: "",
      quality: "",
    },
  ];
  const commodity_value = props.commodity_value ?? "";
  const ref_no = props.ref_no ?? "";
  const date = dateFormat(Date(), "dd-mm-yyyy");
  const customer_name = props.customer_name ?? "customer name";
  const customer_address = props.customer_address ?? "customer address";
  const customer_pan = props.customer_pan ?? "";
  const customer_gst = props.customer_gst ?? "";
  const customer_iec = props.customer_iec ?? "";
  const customer_email = props.customer_email ?? "";
  const bank_name = props.bank_name ?? "";
  const bank_address = props.bank_address ?? "";
  const account_no = props.account_no ?? "";
  const swift_no = props.swift_no ?? "";
  const tel_no = props.tel_no ?? "";
  const fax_no = props.fax_no ?? "";
  const commission = props.commission ?? "";
  const quantity = props.quantity ?? " FCL, POUND";
  const discharge = props.discharge ?? "";
  const delivery = props.delivery ?? "";
  const payment_advance = props.payment_advance ?? "";
  const balance = props.balance ?? "";
  const shipper = props.shipper ?? "P";
  const consignee_pan = props.customer_pan ?? "";
  const consignee_gst = props.customer_gst ?? "";
  const consignee_iec = props.customer_iec ?? "";
  const notify = "Same as Consignee";
  const commodity = props.commodity ?? "";
  const hs_code = props.hs_code ?? "7889";
  const shipping_period = props.shipping_period ?? "";
  const shippment_remark = props.shippment_remark ?? "";
  const importer_pan = props.customer_pan ?? "";
  const importer_gst = props.customer_gst ?? "";
  const importer_iec = props.customer_iec ?? "";
  const original_contract = "Invoice Certificate 110% of CIF Value";
  const invoice = "Pre-Shipment Inspection Certificate";
  const bill_loading = "Form 9";
  const package_list = "Form 6";

  const table = new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: commodity_value,
                    bold: true,
                  }),
                ],
                // alignment: AlignmentType.CENTER,
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
            columnSpan: 7,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                // alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: `Ref.No. ${ref_no}`,
                    bold: true,
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
            columnSpan: 5,
          }),
          new TableCell({
            children: [
              new Paragraph({
                text: `Date ${date}`,
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
            columnSpan: 2,
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
                    text: "CONTRACT & INVOICE DETAILS",
                    bold: true,
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
            columnSpan: 7,
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
                    text: " CUSTOMER",
                    bold: true,
                    margins: {
                      top: convertInchesToTwip(0.04),
                      bottom: convertInchesToTwip(0.2),
                      left: convertInchesToTwip(0.04),
                      right: convertInchesToTwip(0.04),
                    },
                  }),
                ],
                // alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: ` ${customer_name}`,
                    bold: true,
                    margins: {
                      top: convertInchesToTwip(0.04),
                      bottom: convertInchesToTwip(0.2),
                      left: convertInchesToTwip(0.04),
                      right: convertInchesToTwip(0.04),
                    },
                  }),
                ],
                // alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: ` ${customer_address}`,

                    margins: {
                      top: convertInchesToTwip(0.04),
                      bottom: convertInchesToTwip(0.2),
                      left: convertInchesToTwip(0.04),
                      right: convertInchesToTwip(0.04),
                    },
                  }),
                ],
                // alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: ` PAN: ${customer_pan}`,
                    // bold: true,
                    margins: {
                      top: convertInchesToTwip(0.04),
                      bottom: convertInchesToTwip(0.2),
                      left: convertInchesToTwip(0.04),
                      right: convertInchesToTwip(0.04),
                    },
                  }),
                ],
                // alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: ` ${customer_email}`,
                    // bold: true,
                    margins: {
                      top: convertInchesToTwip(0.04),
                      bottom: convertInchesToTwip(0.2),
                      left: convertInchesToTwip(1),
                      right: convertInchesToTwip(0.04),
                    },
                    alignment: AlignmentType.LEFT,
                  }),
                  new TextRun({
                    text: ` GST No: ${customer_gst}`,
                    break: 1,
                    margins: {
                      top: convertInchesToTwip(0.04),
                      bottom: convertInchesToTwip(0.2),
                      left: convertInchesToTwip(1),
                      right: convertInchesToTwip(0.04),
                    },
                    alignment: AlignmentType.RIGHT,
                  }),
                ],
                margins: {
                  top: convertInchesToTwip(0.04),
                  bottom: convertInchesToTwip(0.2),
                  left: convertInchesToTwip(0.04),
                  right: convertInchesToTwip(0.04),
                },
                // alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: ` IEC: ${customer_iec}`,
                    // bold: true,
                    margins: {
                      top: convertInchesToTwip(0.04),
                      bottom: convertInchesToTwip(0.2),
                      left: convertInchesToTwip(0.04),
                      right: convertInchesToTwip(0.04),
                    },
                  }),
                ],
                // alignment: AlignmentType.CENTER,
              }),
            ],
            width: {
              size: 50,
              type: WidthType.PERCENTAGE,
            },
            columnSpan: 3,
          }),

          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "BANK",
                    bold: true,
                    margins: {
                      top: convertInchesToTwip(0.04),
                      bottom: convertInchesToTwip(0.2),
                      left: convertInchesToTwip(0.04),
                      right: convertInchesToTwip(0.04),
                    },
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: bank_name,
                    bold: true,
                    margins: {
                      top: convertInchesToTwip(0.04),
                      bottom: convertInchesToTwip(0.2),
                      left: convertInchesToTwip(0.04),
                      right: convertInchesToTwip(0.04),
                    },
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: bank_address,
                    margins: {
                      top: convertInchesToTwip(0.04),
                      bottom: convertInchesToTwip(0.2),
                      left: convertInchesToTwip(0.04),
                      right: convertInchesToTwip(0.04),
                    },
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `A/C No: ${account_no}`,

                    margins: {
                      top: convertInchesToTwip(0.04),
                      bottom: convertInchesToTwip(0.2),
                      left: convertInchesToTwip(0.04),
                      right: convertInchesToTwip(0.04),
                    },
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Swift: ${swift_no}`,
                    margins: {
                      top: convertInchesToTwip(0.04),
                      bottom: convertInchesToTwip(0.2),
                      left: convertInchesToTwip(0.04),
                      right: convertInchesToTwip(0.04),
                    },
                  }),
                ],
                // alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Tel No.: ${tel_no}`,

                    margins: {
                      top: convertInchesToTwip(0.04),
                      bottom: convertInchesToTwip(0.2),
                      left: convertInchesToTwip(0.04),
                      right: convertInchesToTwip(0.04),
                    },
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Fax No.: ${fax_no}`,

                    margins: {
                      top: convertInchesToTwip(0.04),
                      bottom: convertInchesToTwip(0.2),
                      left: convertInchesToTwip(0.04),
                      right: convertInchesToTwip(0.04),
                    },
                  }),
                ],
                // alignment: AlignmentType.CENTER,
              }),
            ],
            width: {
              size: 50,
              type: WidthType.PERCENTAGE,
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
                children: [
                  new TextRun({
                    text: "COMMODITY",
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
            columnSpan: 2,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "PRICE",
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
            columnSpan: 2,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "QUANTITY",
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
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "QUALITY",
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
            columnSpan: 2,
          }),
        ],
      }),
      ...commodity_details
        .map((comm) => {
          return new TableRow({
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: comm.commodity ?? "",
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
                columnSpan: 2,
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: comm.price ?? "",
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
                columnSpan: 2,
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: comm.quantity ?? "",
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
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: comm.quality ?? "",
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
                columnSpan: 2,
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
                // alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "COMMISSION",
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
            columnSpan: 2,
          }),
          new TableCell({
            children: [
              new Paragraph({
                text: commission,
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
            columnSpan: 5,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                // alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "QUANTITY",
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
            columnSpan: 2,
          }),
          new TableCell({
            children: [
              new Paragraph({
                text: quantity,
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
            columnSpan: 5,
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
                    text: "PORT OF DISCHARGE",
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
            columnSpan: 2,
          }),
          new TableCell({
            children: [
              new Paragraph({
                text: discharge,
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
            columnSpan: 5,
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
                    text: "PORT OF DELIVERY",
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
            columnSpan: 2,
          }),
          new TableCell({
            children: [
              new Paragraph({
                text: delivery,
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
            columnSpan: 5,
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
                    text: "Payment Advance",
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
            columnSpan: 2,
          }),
          new TableCell({
            children: [
              new Paragraph({
                text: payment_advance,
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
            columnSpan: 5,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                // alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "Balance",
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
            columnSpan: 2,
          }),
          new TableCell({
            children: [
              new Paragraph({
                text: balance,
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
            columnSpan: 5,
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
                    text: "SPECIAL CONDITION",
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
            columnSpan: 2,
          }),
          new TableCell({
            children: [
              new Paragraph({
                text: "Shipment in 30 days from the date advance sent, thereafter it will be buyer' choice to extend period or not. In case of 100% CAD it has to be done in max. 30 days from date of contract",
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
            columnSpan: 5,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                text: "1) All shipment for India has to accompany a Pre-shipment Inspection report / Self certified Certificate. \n\n 2) Along with the Invoice & B/L kindly also fax contract as per above details & the original contract has to accompany the original documents and should mention the following remarks :-The consignment does not carry any type of arms, ammunition, mines, shells, cartridges, radioactive contaminated or any other explosive material in any form either used or otherwise. In case any explosive or radioactive materials found in it on arrival in India the Supplier agrees to accept the Containers back to their country / yard.",
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
            columnSpan: 7,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                text: "SHIPMENT / BILL OF LADING INSTRUCTIONS",
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
            columnSpan: 7,
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
                    text: "SHIPPER",
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
            columnSpan: 2,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: shipper,
                    bold: true,
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
            columnSpan: 5,
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
                    text: "CONSIGNEE",
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
            columnSpan: 2,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: customer_name,
                    bold: true,
                    margins: {
                      top: convertInchesToTwip(0.04),
                      bottom: convertInchesToTwip(0.2),
                      left: convertInchesToTwip(0.04),
                      right: convertInchesToTwip(0.04),
                    },
                  }),
                ],
                // alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: customer_address,

                    margins: {
                      top: convertInchesToTwip(0.04),
                      bottom: convertInchesToTwip(0.2),
                      left: convertInchesToTwip(0.04),
                      right: convertInchesToTwip(0.04),
                    },
                  }),
                ],
                // alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `PAN: ${customer_pan}`,
                    // bold: true,
                    margins: {
                      top: convertInchesToTwip(0.04),
                      bottom: convertInchesToTwip(0.2),
                      left: convertInchesToTwip(0.04),
                      right: convertInchesToTwip(0.04),
                    },
                  }),
                ],
                // alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${customer_email}       `,
                    // bold: true,
                    margins: {
                      top: convertInchesToTwip(0.04),
                      bottom: convertInchesToTwip(0.2),
                      left: convertInchesToTwip(0.04),
                      right: convertInchesToTwip(0.04),
                    },
                  }),
                  new TextRun({
                    text: ` GST No: ${customer_gst}            `,
                    // bold: true,
                    margins: {
                      top: convertInchesToTwip(0.04),
                      bottom: convertInchesToTwip(0.2),
                      left: convertInchesToTwip(0.04),
                      right: convertInchesToTwip(0.04),
                    },
                  }),
                  new TextRun({
                    text: `  IEC: ${consignee_iec}`,

                    margins: {
                      top: convertInchesToTwip(0.04),
                      bottom: convertInchesToTwip(0.2),
                      left: convertInchesToTwip(0.04),
                      right: convertInchesToTwip(0.04),
                    },
                  }),
                ],
                // alignment: AlignmentType.CENTER,
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
            columnSpan: 5,
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
                    text: "NOTIFY",
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
            columnSpan: 2,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: notify,
                    bold: true,
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
            columnSpan: 5,
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
                    text: "COMMODITY",
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
            columnSpan: 2,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: commodity,
                    bold: true,
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
            columnSpan: 5,
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
                    text: "HS Code",
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
            columnSpan: 2,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: hs_code,
                    bold: true,
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
            columnSpan: 5,
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
                    text: "QUANTITY",
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
            columnSpan: 2,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: quantity,
                    bold: true,
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
            columnSpan: 5,
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
                    text: "Shipping Period",
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
            columnSpan: 2,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: shipping_period,
                    bold: true,
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
            columnSpan: 5,
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
                    text: "Shipment Remark",
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
            columnSpan: 2,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: shippment_remark,
                    bold: true,
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
            columnSpan: 5,
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
                    text: "B/L BODY MENTION",
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
            columnSpan: 2,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "1) B/L SHOULD MENTION 14 DAYS DETENTION FREE AT FINAL DESTINATION. \n 2) B/L SHOULD BE ENDORSED & SIGNED AT BACK SIDE OF ORIGINAL B/L",
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
            columnSpan: 5,
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
                    text: "Insurance Certificate",
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
            columnSpan: 2,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "110% of Invoice value with Institute cargo of Clause (A) Insurance should be cover from Warehouse to warehouse",
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
            columnSpan: 5,
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
                    text: "INSURANCE + PRE SHIPMENT INSPECTION CERTIFICATE",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.CENTER,
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
            columnSpan: 7,
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
                    text: "IMPORTER",
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
            columnSpan: 2,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: customer_name,
                    bold: true,
                    margins: {
                      top: convertInchesToTwip(0.04),
                      bottom: convertInchesToTwip(0.2),
                      left: convertInchesToTwip(0.04),
                      right: convertInchesToTwip(0.04),
                    },
                  }),
                ],
                // alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: customer_address,

                    margins: {
                      top: convertInchesToTwip(0.04),
                      bottom: convertInchesToTwip(0.2),
                      left: convertInchesToTwip(0.04),
                      right: convertInchesToTwip(0.04),
                    },
                  }),
                ],
                // alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `PAN: ${importer_pan}`,
                    // bold: true,
                    margins: {
                      top: convertInchesToTwip(0.04),
                      bottom: convertInchesToTwip(0.2),
                      left: convertInchesToTwip(0.04),
                      right: convertInchesToTwip(0.04),
                    },
                  }),
                ],
                // alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${customer_email}     `,
                    // bold: true,
                    margins: {
                      top: convertInchesToTwip(0.04),
                      bottom: convertInchesToTwip(0.2),
                      left: convertInchesToTwip(0.04),
                      right: convertInchesToTwip(0.04),
                    },
                  }),
                  new TextRun({
                    text: ` GST No: ${importer_gst}          `,
                    // bold: true,
                    margins: {
                      top: convertInchesToTwip(0.04),
                      bottom: convertInchesToTwip(0.2),
                      left: convertInchesToTwip(0.04),
                      right: convertInchesToTwip(0.04),
                    },
                  }),
                  new TextRun({
                    text: `  IEC: ${consignee_iec}  `,

                    margins: {
                      top: convertInchesToTwip(0.04),
                      bottom: convertInchesToTwip(0.2),
                      left: convertInchesToTwip(0.04),
                      right: convertInchesToTwip(0.04),
                    },
                  }),
                ],
                // alignment: AlignmentType.CENTER,
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
            columnSpan: 5,
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
                    text: "Important Note",
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
            columnSpan: 2,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "1) As Shipment for India has to accompany a Pre-shipment inspection Report which has to be prior date to B/L date but Authorized Agency \n 2) Details of tests carried out: VISUAL INSPECTION OF 100% CARGO WAS CARRIED OUT AND RADIOACTIVE CHECKS WERE PERFORMED \n 3) Due to new rule for Pre-Shipment Inspection Certificate, We shall require: - Radiation Meter reading of empty container - Radiation Meter reading of Loaded container.",
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
            columnSpan: 5,
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
                    text: "ORIGINAL DOCUMENTS REQUIRED IN BANK",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.CENTER,
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
            columnSpan: 7,
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
                    text: "Original Contract",
                  }),
                ],
                alignment: AlignmentType.CENTER,
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
                    text: "Invoice 3 Copies",
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
                    text: "Bill of Lading 3 + 3",
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
                    text: "Packing List",
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
                    text: "Certificate of Origin",
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
                    text: "Weight Slip",
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
                    text: "Freight certificate",
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
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: original_contract,
                  }),
                ],
                alignment: AlignmentType.CENTER,
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
                    text: invoice,
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
                    text: bill_loading,
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
                    text: package_list,
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
              size: 40,
              type: WidthType.PERCENTAGE,
            },
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
            columnSpan: 3,
          }),
        ],
      }),
    ],
    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
  });

  // const image = new ImageRun({
  //   data: readFileSync("./aakash.jpg").toString("base64"),
  //   transformation: {
  //     width: 100,
  //     height: 100,
  //   },
  // });

  const generate = () => {
    const doc = new Document({
      sections: [
        {
          children: [
            // new Paragraph({
            //   children: [image],
            // }),
            table,
          ],
        },
      ],
    });

    docx.Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, `purchase indent-${ref_no}.docx`);
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

export default WordsDocsCreatePurchaseIndents;
