import * as docx from "docx";
import { saveAs } from "file-saver";
import React from "react";
import { Button } from "reactstrap";
import {
  convertInchesToTwip,
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

function Form6(props) {
  const ref_no = props.ref_no ?? "";
  const customer_name = props.customer_name ?? "";
  const customer_address = props.customer_address ?? "";
  const customer_contact_person = props.customer_contact_person ?? "";
  const customer_tel = props.customer_tel ?? "";
  const invoice_no = props.invoice_no ?? "";
  const importer_name = props.importer_name ?? "";
  const importer_address = props.importer_address ?? "";
  const importer_iec = props.importer_iec ?? "";
  const importer_email = props.importer_email ?? "";
  const importer_tel = props.importer_tel ?? "";
  const importer_contact_person = props.importer_contact_person ?? "";
  const bill_of_loading = props.bill_of_loading ?? "";
  const no_of_container = props.no_of_container ?? "";

  const doc_description = props.doc_description ?? "";
  const total_qty = Number(props.total_qty ?? 0).toFixed(2);
  const hs_code = props.hs_code ?? "";
  const received_quantity = props.received_quantity ?? "";
  const basel_no = props.basel_no ?? "";

  const shipping_line = props.shipping_line ?? "";

  const generateRow = (cell) => {
    return new TableRow({
      children: cell?.map((c) => {
        return new TableCell({
          children: c?.paragraph?.map((p) => {
            return new Paragraph({
              children: p?.textRun?.map((t) => {
                return new TextRun({
                  text: t.text ?? "",
                  bold: t.bold,
                  fontSize: t.size ?? "",
                  underline: t.underline ?? "",
                  break: t.break ?? 0,
                });
              }),

              alignment: p.alignment,
              margin: p.margin,
            });
          }),

          width: {
            size: c.size,
            type: WidthType.PERCENTAGE,
          },
          verticalAlign: c.verticalAlign,
          columnSpan: c.columnSpan,
          rowSpan: c.rowSpan,
        });
      }),
    });
  };

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
                    text: `Sr No`,
                    bold: true,
                  }),
                ],
              }),
            ],
            width: {
              size: 7,
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
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: `Description`,
                    bold: true,
                  }),
                ],
              }),
            ],
            width: {
              size: 60,
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
                    text: `:`,
                    bold: true,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                    text: `Details to be furnished by the Exporter/Importer`,
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
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: `(1)`,
                    bold: true,
                  }),
                ],
              }),
            ],
            width: {
              size: 7,
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
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: `(2)`,
                    bold: true,
                  }),
                ],
              }),
            ],
            width: {
              size: 60,
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
                    text: `:`,
                    bold: true,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                    text: `(3)`,
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
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `1.`,
                  }),
                ],
              }),
            ],
            width: {
              size: 5,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `Exporter(Name & Address) Contact Person Tele, Fax and email`,
                  }),
                ],
              }),
            ],
            width: {
              size: 60,
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
                    text: `:`,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `${customer_name} `,
                  }),
                  new TextRun({
                    text: `add: ${customer_address} ${customer_contact_person}`,
                    break: 1,
                  }),
                  new TextRun({
                    text: `Tel: ${customer_tel}`,
                    break: 1,
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
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `2.`,
                  }),
                ],
              }),
            ],
            width: {
              size: 5,
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
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: ``,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `Generator (s) of the waste ( Name and Address) Contact Person Tele, Fax and email`,
                  }),
                ],
              }),
            ],
            width: {
              size: 60,
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
                    text: `:`,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `${customer_name} `,
                  }),
                  new TextRun({
                    text: `add: ${customer_address} ${customer_contact_person}`,
                    break: 1,
                  }),
                  new TextRun({
                    text: `Tel: ${customer_tel}`,
                    break: 1,
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
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: ``,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `Site of generation`,
                  }),
                ],
              }),
            ],
            width: {
              size: 60,
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
                    text: `:`,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `Same as above`,
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
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `3.`,
                  }),
                ],
              }),
            ],
            width: {
              size: 5,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `Importer or Actual user (Name & Address) Contact Person Tele, Fax and email`,
                  }),
                ],
              }),
            ],
            width: {
              size: 60,
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
                    text: `:`,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `${importer_name}`,
                  }),
                  new TextRun({
                    text: `${importer_address}`,
                    break: 1,
                  }),
                  new TextRun({
                    text: `IEC Code : ${importer_iec}`,
                    break: 1,
                  }),
                  new TextRun({
                    text: `EMAIL : ${importer_email}`,
                    break: 1,
                  }),
                  new TextRun({
                    text: `CONTACT PERSON : ${importer_contact_person}`,
                    break: 1,
                  }),

                  new TextRun({
                    text: `Tel : ${importer_tel}`,
                    break: 1,
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
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: `4.`,
                  }),
                ],
              }),
            ],
            width: {
              size: 5,
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
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: ``,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `Trader (Name & Address) Contact Person Tele, Fax and email`,
                  }),
                ],
              }),
            ],
            width: {
              size: 60,
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
                    text: `:`,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `${importer_name}`,
                  }),
                  new TextRun({
                    text: `${importer_address}`,
                    break: 1,
                  }),
                  new TextRun({
                    text: `IEC Code : ${importer_iec}`,
                    break: 1,
                  }),
                  new TextRun({
                    text: `EMAIL : ${importer_email}`,
                    break: 1,
                  }),
                  new TextRun({
                    text: `CONTACT PERSON : ${importer_contact_person}`,
                    break: 1,
                  }),

                  new TextRun({
                    text: `Tel : ${importer_tel}`,
                    break: 1,
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
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: ``,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `Details of actual use (Name & Address) Contact Person Tele, Fax and email`,
                  }),
                ],
              }),
            ],
            width: {
              size: 60,
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
                    text: `:`,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `Same as above`,
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
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `5.`,
                  }),
                ],
              }),
            ],
            width: {
              size: 5,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `Corresponding to applicant Ref. No. if any`,
                  }),
                ],
              }),
            ],
            width: {
              size: 60,
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
                    text: `:`,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `Invoice ${invoice_no}`,
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
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `6.`,
                  }),
                ],
              }),
            ],
            width: {
              size: 5,
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
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `Bill of Lading (attach copy)`,
                  }),
                ],
              }),
            ],
            width: {
              size: 60,
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
                    text: `:`,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `${bill_of_loading}`,
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
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `7.`,
                  }),
                ],
              }),
            ],
            width: {
              size: 5,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `Country of Import / Export`,
                  }),
                ],
              }),
            ],
            width: {
              size: 60,
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
                    text: `:`,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
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
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `8.`,
                  }),
                ],
              }),
            ],
            width: {
              size: 5,
              type: WidthType.PERCENTAGE,
            },
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
            columnSpan: 1,
            rowSpan: 3,
          }),
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `General description of waste`,
                  }),
                ],
              }),
            ],
            width: {
              size: 60,
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
                    text: `:`,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `${doc_description}`,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `(a) Quantity`,
                  }),
                  new TextRun({
                    text: `(b) Physical characteristics`,
                    break: 1,
                  }),
                  new TextRun({
                    text: `(c) Chemical composition of waste ( attach details ), Where Applicable`,
                    break: 1,
                  }),
                  new TextRun({
                    text: `(d) Basel No.`,
                    break: 1,
                  }),
                ],
              }),
            ],
            width: {
              size: 60,
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
                    text: `:`,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `${total_qty}`,
                  }),
                  new TextRun({
                    text: `SOLID`,
                    break: 1,
                  }),
                  new TextRun({
                    text: ``,
                    break: 1,
                  }),
                  new TextRun({
                    text: `${basel_no}`,
                    break: 1,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `(e) UN Shipping name`,
                  }),
                  new TextRun({
                    text: `(f) UN Class`,
                    break: 1,
                  }),
                  new TextRun({
                    text: `(g) UN No`,
                    break: 1,
                  }),
                  new TextRun({
                    text: `(h) H Number`,
                    break: 1,
                  }),
                  new TextRun({
                    text: `(i) Y Number`,
                    break: 1,
                  }),
                  new TextRun({
                    text: `(j) ITC (HS)`,
                    break: 1,
                  }),
                  new TextRun({
                    text: `(k) Customs Code ( H.S. )`,
                    break: 1,
                  }),
                  new TextRun({
                    text: `(l) Other (specify )`,
                    break: 1,
                  }),
                ],
              }),
            ],
            width: {
              size: 60,
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
                    text: `:`,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `${shipping_line}`,
                  }),
                  new TextRun({
                    text: ``,
                    break: 1,
                  }),
                  new TextRun({
                    text: ``,
                    break: 1,
                  }),
                  new TextRun({
                    text: ``,
                    break: 1,
                  }),
                  new TextRun({
                    text: ``,
                    break: 1,
                  }),
                  new TextRun({
                    text: `${hs_code}`,
                    break: 1,
                  }),
                  new TextRun({
                    text: `${hs_code}`,
                    break: 1,
                  }),
                  new TextRun({
                    text: ``,
                    break: 1,
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
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `9.`,
                  }),
                ],
              }),
            ],
            width: {
              size: 5,
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
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `Type of packages`,
                  }),
                ],
              }),
            ],
            width: {
              size: 60,
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
                    text: `:`,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `Loose`,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `Number`,
                  }),
                ],
              }),
            ],
            width: {
              size: 60,
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
                    text: `:`,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `${no_of_container} FCL`,
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
        ],
      }),

      new TableRow({
        children: [
          new TableCell({
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `10.`,
                  }),
                ],
              }),
            ],
            width: {
              size: 5,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `Special handling requirements including emergency provision is the case of accidents.`,
                  }),
                ],
              }),
            ],
            width: {
              size: 60,
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
                    text: `:`,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
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
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `11.`,
                  }),
                ],
              }),
            ],
            width: {
              size: 5,
              type: WidthType.PERCENTAGE,
            },
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
            columnSpan: 1,
            rowSpan: 3,
          }),
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `Movement subject to single / multiple consignment`,
                  }),
                ],
              }),
            ],
            width: {
              size: 60,
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
                    text: `:`,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `Multiple`,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `In case of multiple movement (a) Expected dates of each shipment or expected frequency of the shipments (b)`,
                  }),
                ],
              }),
            ],
            width: {
              size: 60,
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
                    text: `:`,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `${total_qty} MT`,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `Estimated total quantity and quantities for each individual shipment.`,
                  }),
                ],
              }),
            ],
            width: {
              size: 60,
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
                    text: `:`,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
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
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `12.`,
                  }),
                ],
              }),
            ],
            width: {
              size: 5,
              type: WidthType.PERCENTAGE,
            },
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
            columnSpan: 1,
            rowSpan: 5,
          }),
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `Transporter of waste (Name & Address) Contact Person Tele, Fax and email`,
                  }),
                ],
              }),
            ],
            width: {
              size: 60,
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
                    text: `:`,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `Registration number`,
                  }),
                ],
              }),
            ],
            width: {
              size: 60,
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
                    text: `:`,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `Means of transport (road, rail, inland waterway, sea, air) 2`,
                  }),
                ],
              }),
            ],
            width: {
              size: 60,
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
                    text: `:`,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `Sea`,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `Date of Transfer`,
                  }),
                ],
              }),
            ],
            width: {
              size: 60,
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
                    text: `:`,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `Signature of Carrier�s representative`,
                  }),
                ],
              }),
            ],
            width: {
              size: 60,
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
                    text: `:`,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
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
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `13.`,
                  }),
                ],
              }),
            ],
            width: {
              size: 5,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `I certify that the information in SI. Nos. 1 to 12 above are complete and correct to my best knowledge. I also certify that legally-enforceable written contractual obligations have been entered into and are in force covering the transboundary movement regulations / rules. `,
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `Date: `,
                  }),
                  new TextRun({
                    text: `Signature: `,
                    break: 1,
                  }),
                  new TextRun({
                    text: `Name: `,
                    break: 1,
                  }),
                ],
              }),
            ],
            width: {
              size: 60,
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
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: `:`,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
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
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `TO BE COMPLETED BY IMPORTER ( ACTUAL USEROR TRADER )`,
                    bold: true,
                  }),
                ],
              }),
            ],
            width: {
              size: 67,
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
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: `:`,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
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
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `14.`,
                  }),
                ],
              }),
            ],
            width: {
              size: 5,
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
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `Shipment received by importer / actual user / trader 2/3.`,
                  }),
                ],
              }),
            ],
            width: {
              size: 60,
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
                    text: `:`,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `Quantity received      Kgs. / Litres `,
                  }),
                  new TextRun({
                    text: `Date:                  Name:`,
                    break: 1,
                  }),
                  new TextRun({
                    text: `Signature:`,
                    break: 1,
                  }),
                ],
              }),
            ],
            width: {
              size: 60,
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
                    text: `:`,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `${received_quantity}`,
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
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `15.`,
                  }),
                ],
              }),
            ],
            width: {
              size: 5,
              type: WidthType.PERCENTAGE,
            },
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
            columnSpan: 1,
            rowSpan: 3,
          }),
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `Methods of recovery`,
                  }),
                ],
              }),
            ],
            width: {
              size: 60,
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
                    text: `:`,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `R Code*`,
                  }),
                ],
              }),
            ],
            width: {
              size: 60,
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
                    text: `:`,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `Technology employed ( Attached details if necessary )`,
                  }),
                ],
              }),
            ],
            width: {
              size: 60,
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
                    text: `:`,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
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
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `16.`,
                  }),
                ],
              }),
            ],
            width: {
              size: 5,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `I certify that nothing other than declared goods covered as per above Rules is intended to be imported in the above referred consignment and will be recycled / utilized. Signature: :                  Date:`,
                  }),
                ],
              }),
            ],
            width: {
              size: 60,
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
                    text: `:`,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
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
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `17.`,
                  }),
                ],
              }),
            ],
            width: {
              size: 5,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `SPECIFIC CONDITIONS ON CONSENTING TO THE MOVEMENT
                    (Attach details):`,
                  }),
                  new TextRun({
                    text: `(If applicable)`,
                    break: 1,
                  }),
                ],
              }),
            ],
            width: {
              size: 60,
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
                    text: `:`,
                  }),
                ],
              }),
            ],
            width: {
              size: 2,
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
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: ``,
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
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `Notes :- (1) Attach list, if more than one; (2) Select appropriate option; (3) immediately contact Competent Authority; in case of any emergency; (4) If more than one transporter carriers, attach information as required in SI No.12.`,
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
            columnSpan: 5,
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
                  text: "FORM 6",
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

            new Paragraph({
              children: [
                new TextRun({
                  text: "[See Rules 13(2) & 13(10), 14 (5)]",
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

            new Paragraph({
              children: [
                new TextRun({
                  text: "TRANSBOUNDARY MOVEMENT � MOVEMENT DOCUMENT",
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
            new Paragraph({
              children: [
                new TextRun({
                  text: "List of abbreviations used in the Movement Document",
                  bold: true,
                  break: 2,
                }),
              ],
              alignment: AlignmentType.LEFT,
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
                  text: "RECOVERY OPERATIONS (*)",
                  bold: true,
                  break: 1,
                }),
              ],
              alignment: AlignmentType.LEFT,
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
                  text: "R1",
                  bold: true,
                  break: 1,
                }),
                new TextRun({
                  text: "Use as a fuel (other than in direct incineration) or other means to generate energy.",
                }),
                new TextRun({
                  text: "R2",
                  bold: true,
                  break: 1,
                }),
                new TextRun({
                  text: "Solvent reclamation/regeneration",
                }),
                new TextRun({
                  text: "R3",
                  bold: true,
                  break: 1,
                }),
                new TextRun({
                  text: "Recycling/reclamation of organic substances which are not used as solvents",
                }),
                new TextRun({
                  text: "R4",
                  bold: true,
                  break: 1,
                }),
                new TextRun({
                  text: "Recycling/reclamation of metals and metal compounds",
                }),
                new TextRun({
                  text: "R5",
                  bold: true,
                  break: 1,
                }),
                new TextRun({
                  text: "Recycling/reclamation of other inorganic materials",
                }),
                new TextRun({
                  text: "R6",
                  bold: true,
                  break: 1,
                }),
                new TextRun({
                  text: "Regeneration of acids or bases",
                }),
                new TextRun({
                  text: "R7",
                  bold: true,
                  break: 1,
                }),
                new TextRun({
                  text: "Recovery of components from used for pollution abatement",
                }),
                new TextRun({
                  text: "R8",
                  bold: true,
                  break: 1,
                }),
                new TextRun({
                  text: " Recovery of components from catalysts",
                }),
                new TextRun({
                  text: "R9",
                  bold: true,
                  break: 1,
                }),
                new TextRun({
                  text: "Used oil re-refining or other reuses of previously used oil",
                }),
                new TextRun({
                  text: "R10",
                  bold: true,
                  break: 1,
                }),
                new TextRun({
                  text: "Land treatment resulting in benefit to agricultural or eco-logical improvement",
                }),
                new TextRun({
                  text: "R11",
                  bold: true,
                  break: 1,
                }),
                new TextRun({
                  text: "Uses of residual material obtained from any of the operations numbered R1 to R10",
                }),
              ],
              alignment: AlignmentType.LEFT,
              margins: {
                top: convertInchesToTwip(0.1),
                bottom: convertInchesToTwip(1),
                left: convertInchesToTwip(0.1),
                right: convertInchesToTwip(0.1),
              },
            }),

            new Paragraph({
              tabStops: [
                {
                  type: TabStopType.LEFT,
                  position: 6000,
                },
              ],

              children: [
                new TextRun({
                  text: `Date:${dateFormat(new Date(), "dd/mm/yyyy")}`,
                  bold: true,
                  break: 1,
                }),
                new TextRun({
                  text: `\tSignature:`,
                  bold: true,
                }),
              ],
              alignment: AlignmentType.LEFT,
              margins: {
                top: convertInchesToTwip(0.1),
                bottom: convertInchesToTwip(1),
                left: convertInchesToTwip(0.1),
                right: convertInchesToTwip(0.1),
              },
            }),
            new Paragraph({
              tabStops: [
                {
                  type: TabStopType.LEFT,
                  position: 6000,
                },
              ],

              children: [
                new TextRun({
                  text: `Place:`,
                  bold: true,
                  break: 1,
                }),
                new TextRun({
                  text: `\tDesignation:`,
                  bold: true,
                }),
              ],
              alignment: AlignmentType.LEFT,
              margins: {
                top: convertInchesToTwip(0.1),
                bottom: convertInchesToTwip(1),
                left: convertInchesToTwip(0.1),
                right: convertInchesToTwip(0.1),
              },
            }),
          ],
        },
      ],
    });

    docx.Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, `form_6_${ref_no}.docx`);
      console.log("Document created successfully");
    });
  };

  return (
    <Button className="btn p-2" onClick={() => generate()}>
      <i className="fa fa-file-word mr-2" />
      Form 6
    </Button>
  );
}

export default Form6;
