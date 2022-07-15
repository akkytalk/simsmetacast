import * as docx from "docx";
import { readFileSync } from "fs";
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

function WordsDocsEditCreateSalesIndents({
  purchaseSalesIndentData,
  ...props
}) {
  const ref_no = props.ref_no ?? "";
  const date = dateFormat(Date(), " dS mmmm, yyyy");
  const shipper_name = props.shipper_name ?? "";
  const customer_name = props.customer_name ?? "customer name";
  const customer_address = props.customer_address ?? "customer address";
  const customer_pan = props.customer_pan ?? "";
  const customer_gst = props.customer_gst ?? "";
  const customer_iec = props.customer_iec ?? "";
  const customer_vat = props.customer_vat ?? "";
  const customer_email = props.customer_email ?? "";
  const bank_name = props.bank_name ?? "";
  const bank_address = props.bank_address ?? "";
  const account_no = props.account_no ?? "";
  const ifsc_code = props.ifsc_code ?? "";
  const swift_no = props.swift_no ?? "";
  const iban_no = props.iban_no ?? "";
  const contact_person = props.contact_person ?? "";
  const phone_no = props.phone_no ?? "";
  const item_name = props.item_name ?? "";
  const bl_desc = props.bl_desc ?? "";
  const tonnage = props.tonnage ?? "";

  const price = props.price ?? "";
  const commission = props.commission ?? "0.00";
  const discharge = props.discharge ?? "";
  const delivery = props.delivery ?? "";
  const payment_advance = props.payment_advance ?? "";
  const balance = props.balance ?? "";
  const notify = "Same as Consignee";
  const bl_material_desc = props.bl_desc ?? "";
  const hs_code = props.hs_code ?? "";
  const shipping_period = props.shipping_period ?? "";
  const shippment_remark = props.shippment_remark ?? "";

  // console.log("shipping_period", shipping_period);

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
                    text: "Material",
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
                text: "Shipper",
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
                text: `Name ${shipper_name}`,
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
                text: "Customer",
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
                    text: "Customer Name: ",
                    bold: true,
                  }),
                  new TextRun({
                    text: customer_name,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Address: ",
                    bold: true,
                  }),
                  new TextRun({
                    text: customer_address,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Pan No: ",
                    bold: true,
                  }),
                  new TextRun({
                    text: customer_pan,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "GST: ",
                    bold: true,
                  }),
                  new TextRun({
                    text: customer_gst,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "VAT: ",
                    bold: true,
                  }),
                  new TextRun({
                    text: customer_vat,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "IEC NO: ",
                    bold: true,
                  }),
                  new TextRun({
                    text: customer_iec,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Email: ",
                    bold: true,
                  }),
                  new TextRun({
                    text: customer_email,
                  }),
                ],
              }),
              new Paragraph({
                text: "",
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Bank Name: ",
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
                    text: "Branch Address: ",
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
                    text: "Account Number: ",
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
                    text: "IFSC Code: ",
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
                    text: "Swift No.: ",
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
                    text: "IBAN No: ",
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
                    text: "Contact Person: ",
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
                    text: "Phone Number: ",
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
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                text: "Item",
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
                text: item_name,
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
                text: "BL Description",
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
                text: bl_desc,
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
                text: "Tonnage",
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
                text: tonnage,
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
                text: "Price / Ton",
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
                text: `${price}`,
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
            verticalAlign: VerticalAlign.CENTER,
          }),
        ],
      }),

      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                text: "Commission / Ton",
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
            verticalAlign: VerticalAlign.CENTER,
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
                    text: "Payment",
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
                text: "Payment Advance",
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
            verticalAlign: VerticalAlign.CENTER,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                text: "Balance",
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
            verticalAlign: VerticalAlign.CENTER,
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
                    text: "Shipping",
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
                text: "Incoterms",
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
                text: "CIF",
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
            verticalAlign: VerticalAlign.CENTER,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                text: "Shipping Period",
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
                text: shipping_period,
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
            verticalAlign: VerticalAlign.CENTER,
          }),
        ],
      }),

      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                text: "Shipping Remark",
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
                text: shippment_remark,
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
            verticalAlign: VerticalAlign.CENTER,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                text: "Port of Discharge",
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
            verticalAlign: VerticalAlign.CENTER,
          }),
        ],
      }),

      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                text: "Port of Final Delivery",
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
            verticalAlign: VerticalAlign.CENTER,
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
                    text: "BL Instructions",
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
                text: "Shipper",
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
                text: shipper_name,
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
            verticalAlign: VerticalAlign.CENTER,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                text: "Consignee",
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
                    text: "Customer Name: ",
                    bold: true,
                  }),
                  new TextRun({
                    text: customer_name,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Address: ",
                    bold: true,
                  }),
                  new TextRun({
                    text: customer_address,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Pan No: ",
                    bold: true,
                  }),
                  new TextRun({
                    text: customer_pan,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "GST: ",
                    bold: true,
                  }),
                  new TextRun({
                    text: customer_gst,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "VAT: ",
                    bold: true,
                  }),
                  new TextRun({
                    text: customer_vat,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "IEC NO: ",
                    bold: true,
                  }),
                  new TextRun({
                    text: customer_iec,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Email: ",
                    bold: true,
                  }),
                  new TextRun({
                    text: customer_email,
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
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                text: "Notify",
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
                text: notify,
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
            verticalAlign: VerticalAlign.CENTER,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                text: "BL Material Description",
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
                text: bl_material_desc,
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
            verticalAlign: VerticalAlign.CENTER,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                text: "Port of Discharge",
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
            verticalAlign: VerticalAlign.CENTER,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                text: "Port of Final Delivery",
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
            verticalAlign: VerticalAlign.CENTER,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                text: "HS Code",
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
                text: hs_code,
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
            verticalAlign: VerticalAlign.CENTER,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                text: "Remarks",
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
                text: "- We cannot guarantee for 10/14 free days, apart from Standard free days provided by shipping line though we will try for maximum free days possible. \n- INTEREST IF ANY CHARGED BY SUPPLIERS FOR DELAYED PAYMENT, PLEASE PAY WITH DOCUMENT \n OR \n IF IT IS DEBITED TO US, WE WILL DEBIT YOU FOR SAME AS SUPPLIER NORMALLY DEBITS FROM OUR ACCOUNT",
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
            verticalAlign: VerticalAlign.CENTER,
          }),
        ],
      }),
      new TableRow({
        children: [
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
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [
              new Paragraph({
                text: "Freight Prepaid",
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
            verticalAlign: VerticalAlign.CENTER,
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
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "SALE INDENT CONFIRMATION",
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
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({
                  text: `DATED: ${date}`,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({
                  text: `REF [${ref_no}]`,
                }),
              ],
            }),
            new Paragraph({
              text: "",
            }),
            new Paragraph({
              text: "",
            }),
            new Paragraph({
              alignment: AlignmentType.LEFT,
              children: [
                new TextRun({
                  text: `TO,`,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.LEFT,
              children: [
                new TextRun({
                  text: `${customer_name}`,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.LEFT,
              children: [
                new TextRun({
                  text: `${customer_address}`,
                }),
              ],
            }),
            new Paragraph({
              text: "",
            }),
            table_2,
            new Paragraph({
              text: "",
            }),
            new Paragraph({
              alignment: AlignmentType.LEFT,
              children: [
                new TextRun({
                  text: "WE HEREBY CONFIRM FOR YOU, INDENTING THE SALES AS BELOWS -",
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              text: "",
            }),
            new Paragraph({
              text: "",
            }),
            table,
          ],
        },
      ],
    });

    docx.Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, `sales indent-${ref_no}.docx`);
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

export default WordsDocsEditCreateSalesIndents;
