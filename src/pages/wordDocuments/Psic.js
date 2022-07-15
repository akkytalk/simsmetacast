import * as docx from "docx";
import { saveAs } from "file-saver";
import React from "react";
import {
  convertInchesToTwip,
  LevelFormat,
  UnderlineType,
  WidthType,
} from "docx";
import { Button } from "reactstrap";

const {
  Document,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  AlignmentType,
} = docx;

function Psic(props) {
  const ref_no = props.ref_no ?? "";
  const customer_name = props.customer_name ?? "customer name";
  const customer_email = props.customer_email ?? "customer name";
  const customer_address = props.customer_address ?? "customer address";

  const customer_tel = props.customer_tel ?? "";

  const importer_name = props.importer_name ?? "";
  const importer_address = props.importer_address ?? "";

  const importer_iec = props.importer_iec ?? "";
  const importer_email = props.importer_email ?? "";
  const importer_tel = props.importer_tel ?? "";

  const doc_description = props.doc_description ?? "";

  const total_qty = Number(props.total_qty ?? 0).toFixed(2);

  const container =
    props.container?.length > 0
      ? props.container
      : [
          {
            container_no: "container no",
            seal_no: "seal no",
            quantity: 0,
          },
        ];

  const createDefaultBulletPoints = (text, bold, level) => {
    return new Paragraph({
      children: [
        new TextRun({
          text: text ?? "",
          bold: bold ? bold : false,
        }),
      ],
      numbering: {
        reference: "my-crazy-numbering",
        level: level ?? 1,
      },
      margins: {
        top: convertInchesToTwip(0.04),
        bottom: convertInchesToTwip(0.04),
        left: convertInchesToTwip(0.04),
        right: convertInchesToTwip(0.04),
      },
    });
  };

  const createBullet = (text, level) => {
    return new Paragraph({
      text: text ?? "",
      bullet: {
        level: level ?? 1,
      },
    });
  };

  const table = new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Sr. No.",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.LEFT,
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
          }),
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
                    text: "Seal Number*",

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
                    text: "Quantity (in MTs)",
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
                    text: "Background radiation level(uSv/h)",

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
                    text: "Container radiation level(uSv/h)",
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
        ],
      }),
      ...container
        .map((container, index) => {
          return new TableRow({
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `${index + 1}`,
                      }),
                    ],
                    alignment: AlignmentType.CENTER,
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
              }),
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
                    text: `${container.quantity}`,
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
                    text: `0.12`,
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
                    text: `0.07`,
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
      numbering: {
        config: [
          {
            reference: "my-crazy-numbering",
            levels: [
              {
                level: 0,
                format: LevelFormat.LOWER_LETTER,
                text: "%1",
                alignment: AlignmentType.START,
                style: {
                  paragraph: {
                    indent: {
                      left: convertInchesToTwip(0.5),
                      hanging: convertInchesToTwip(0.18),
                    },
                  },
                },
              },
              {
                level: 1,
                format: LevelFormat.LOWER_LETTER,
                text: "%2.",
                alignment: AlignmentType.START,
                style: {
                  paragraph: {
                    indent: {
                      left: convertInchesToTwip(0.5),
                      hanging: convertInchesToTwip(0.18),
                    },
                  },
                },
              },
              {
                level: 2,
                format: LevelFormat.LOWER_ROMAN,
                text: "%3.",
                alignment: AlignmentType.START,
                style: {
                  paragraph: {
                    indent: {
                      left: 1220,
                      hanging: convertInchesToTwip(0.18),
                    },
                  },
                },
              },
              {
                level: 3,
                format: LevelFormat.DECIMAL_ZERO,
                text: "%4.",
                alignment: AlignmentType.START,
                style: {
                  paragraph: {
                    indent: {
                      left: convertInchesToTwip(0.5),
                      hanging: convertInchesToTwip(0.18),
                    },
                  },
                },
              },
            ],
          },
          {
            reference: "my-unique-bullet-points",
            levels: [
              {
                level: 0,
                format: LevelFormat.BULLET,
                text: "\u1F60",
                alignment: AlignmentType.LEFT,
                style: {
                  paragraph: {
                    indent: {
                      left: convertInchesToTwip(0.5),
                      hanging: convertInchesToTwip(0.25),
                    },
                  },
                },
              },
              {
                level: 1,
                format: LevelFormat.BULLET,
                text: "\u00A5",
                alignment: AlignmentType.LEFT,
                style: {
                  paragraph: {
                    indent: {
                      left: convertInchesToTwip(1),
                      hanging: convertInchesToTwip(0.25),
                    },
                  },
                },
              },
              {
                level: 2,
                format: LevelFormat.BULLET,
                text: "\u273F",
                alignment: AlignmentType.LEFT,
                style: {
                  paragraph: {
                    indent: { left: 2160, hanging: convertInchesToTwip(0.25) },
                  },
                },
              },
              {
                level: 3,
                format: LevelFormat.BULLET,
                text: "\u267A",
                alignment: AlignmentType.LEFT,
                style: {
                  paragraph: {
                    indent: { left: 2880, hanging: convertInchesToTwip(0.25) },
                  },
                },
              },
              {
                level: 4,
                format: LevelFormat.BULLET,
                text: "\u2603",
                alignment: AlignmentType.LEFT,
                style: {
                  paragraph: {
                    indent: { left: 3600, hanging: convertInchesToTwip(0.25) },
                  },
                },
              },
            ],
          },
        ],
      },

      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "ORIGINAL",
                  bold: true,
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
                  text: "Appendix-2H",
                  bold: true,
                  break: 1,
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
                  text: "PRE-SHIPMENT INSPECTION CERTIFICATE",
                  bold: true,
                  break: 1,
                  underline: {},
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
                  text: "This Pre-Shipment Inspection Certificate is issued in terms of paragraph 2.54 of Handbook of Procedure for",
                  break: 1,
                }),
                new TextRun({
                  text: "import of shredded, un-shredded, compressed and loose forms of metallic waste and scrap. Certificate No:  ",

                  break: 1,
                  underline: {
                    type: UnderlineType.DOTTED,
                  },
                }),
                new TextRun({
                  text: "I, hereby certify the details as below:-",
                  break: 2,
                }),
                new TextRun({
                  text: "That I/we have visually inspected the consignment and certify the following:",
                  break: 1,
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
                  text: "",
                }),
              ],
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: "The imported consignment is actually metallic scrap/second/defective as per the internationally accepted parameters for such a classification.",
                }),
              ],
              numbering: {
                reference: "my-crazy-numbering",
                level: 1,
              },
            }),
            createDefaultBulletPoints(
              "The consignment does not contain any symbol related to ionizing radiation and/or any marking related to transport of dangerous goods classified as Class 7 as per United Nations classification."
            ),
            createDefaultBulletPoints(
              "Details of Importer are as follows:",
              true
            ),
            createDefaultBulletPoints(`Name: ${importer_name}`, false, 2),
            createDefaultBulletPoints(`Address: ${importer_address}`, false, 2),
            createDefaultBulletPoints(
              `Import Export Code No. ${importer_iec}`,
              false,
              2
            ),
            createDefaultBulletPoints(
              `Telephone No. ${importer_tel}`,
              false,
              2
            ),
            createDefaultBulletPoints(`E-mail ${importer_email}`, false, 2),
            createDefaultBulletPoints(
              "Details of Exporter are as follows:",
              true
            ),
            createDefaultBulletPoints(`Name: ${customer_name}`, false, 2),
            createDefaultBulletPoints(`Address: ${customer_address}`, false, 2),
            createDefaultBulletPoints(
              `Telephone No.: ${customer_tel}`,
              false,
              2
            ),
            createDefaultBulletPoints(`E-mail: ${customer_email} `, false, 2),
            createDefaultBulletPoints("Type of scrap: ", true),
            createDefaultBulletPoints(
              `Details and quantity of import: ${total_qty} MT`,
              false
            ),
            new Paragraph({
              children: [
                new TextRun({
                  text: "",
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Description of metallic scrap: ${doc_description}`,
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

            table,
            new Paragraph({
              children: [
                new TextRun({
                  text: `*Note 1: Seal Number of the Seal affixed by PSIA/Exporter.`,
                  size: 12,
                }),
                new TextRun({
                  text: `Note 2: In cases where the Customs of the exporting country have put seal (after examination of the container) the changed reflected in Bill of Lading shall be applicable`,
                  size: 12,
                  break: 1,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "",
                  break: 1,
                }),
              ],
            }),
            createDefaultBulletPoints(``),
            createDefaultBulletPoints(`Country of Inspection : `, false, 2),
            createDefaultBulletPoints(`Place of Inspection :  `, false, 2),
            createDefaultBulletPoints(
              `Duration of inspection (in hours) from: 3-4 Hrs. `,
              false,
              2
            ),
            createDefaultBulletPoints(
              `v.	In case inspection is carried out in a country where PSIA does not have an equipped branch office, then date of prior intimation by e-mail to DGFT (at psia-travel-dgft@gov.in) `,
              false,
              2
            ),
            createDefaultBulletPoints(`Country of Inspection : `, false, 2),
            new Paragraph({
              children: [
                new TextRun({
                  text: "",
                  break: 1,
                }),
              ],
            }),
            createDefaultBulletPoints(
              `Details of radiation survey meter used: `,
              true
            ),

            createBullet("Make— MSpec", 1),
            createBullet("Model— RADCOMM", 1),
            createBullet("Serial No.— 100626", 1),
            createBullet("date of calibration— 05.09.2019", 1),
            new Paragraph({
              children: [
                new TextRun({
                  text: "DECLARATION",
                  bold: true,
                  break: 1,
                  underline: {},
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
                  text: "",
                  break: 1,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "The consignment does not contain any type of arms, ammunition, mines, shells, cartridges or any other explosive material in any form, either used or otherwise, and that the consignment was checked for radiation level and it does not have radiation levels (gamma and neutron) in excess of natural background.",
                }),
                new TextRun({
                  text: " The radiation level of the consignment is within the accepted range and is fit to be exported to India",
                  bold: true,
                }),
              ],
              numbering: {
                reference: "my-crazy-numbering",
                level: 2,
              },
              margins: {
                top: convertInchesToTwip(0.04),
                bottom: convertInchesToTwip(0.04),
                left: convertInchesToTwip(0.04),
                right: convertInchesToTwip(0.04),
              },
            }),
            createDefaultBulletPoints(
              `The photographs/video clip of the inspection carried out, along with duly signed inspection report of the inspector and scanned copy of this PSIC are being uploaded on DGFT website / e-mailed to DGFT (at psic-dgft@gov.in). `,
              false,
              2
            ),
            createDefaultBulletPoints(
              `I/We hereby declare that the particulars and statement made in this certificate are true and correct and nothing has been concealed or held there form.`,
              false,
              2
            ),
            new Paragraph({
              children: [
                new TextRun({
                  text: "Date: 07/03/2020",
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
                  text: "Authorized signatory",
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
              text: "",
            }),
            new Paragraph({
              text: "",
            }),
            new Table({
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "Seal of PSIA",
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
                        top: convertInchesToTwip(0.1),
                        bottom: convertInchesToTwip(0.5),
                        left: convertInchesToTwip(0.1),
                        right: convertInchesToTwip(0.4),
                      },
                      alignment: AlignmentType.LEFT,
                    }),
                  ],
                }),
              ],
              width: {
                size: 25,
                type: WidthType.PERCENTAGE,
              },
            }),
            new Paragraph({
              text: "",
            }),
            new Paragraph({
              text: "",
            }),
            new Table({
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "PSIA’s uniquely numbered hologram",
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
                        top: convertInchesToTwip(0.1),
                        bottom: convertInchesToTwip(0.5),
                        left: convertInchesToTwip(0.1),
                        right: convertInchesToTwip(0.4),
                      },
                      alignment: AlignmentType.LEFT,
                    }),
                  ],
                }),
              ],
              width: {
                size: 30,
                type: WidthType.PERCENTAGE,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "Name of the Inspector: ",
                  break: 1,
                }),
                new TextRun({
                  text: "VÄLI-MATTILA JUTTA",
                  bold: true,
                }),
                new TextRun({
                  text: "Address (office): Koning I.copold lii Laan 21a, Heverlee,",
                  break: 1,
                }),
                new TextRun({
                  text: "Belgium Postcode 3001",
                  break: 1,
                }),
                new TextRun({
                  text: "E-mail Address: tubbyimpexin@gmail.com",
                  break: 1,
                }),
                new TextRun({
                  text: "Name of the PSIA (as per Appendix 2G): Tubby Impex Pvt. Ltd,",
                  break: 2,
                }),
                new TextRun({
                  text: "Address: C-54, 3rd Floor, South Extension- Part-2,",
                  break: 1,
                }),
                new TextRun({
                  text: "New Delhi-110048",
                  break: 1,
                }),
                new TextRun({
                  text: "Telephone Number: +91-11-26264808",
                  break: 1,
                }),
                new TextRun({
                  text: "E-mail: tubbyimpexin@gmail.com",
                  break: 1,
                }),
                new TextRun({
                  text: "* Name of the agency as per Appendix 2G of Appendices and Aayat Niryat Forms of Foreign Trade Policy, 2015-20 in terms of Para 2.55 (d) of HBP 2015-20 (Dated 4 TH December, 2019) Sl. No. 4: Tubby Impex Private Limited.",
                  break: 2,
                }),
                new TextRun({
                  text: "*Notified by DGFT-Government of India vide PN. No. 46/2015-2020 New Delhi dated: 4TH December, 2019",
                  break: 1,
                }),
                new TextRun({
                  text: "Note: ",
                  break: 2,
                  bold: true,
                }),
                new TextRun({
                  text: "Exclusions: weight/Quality.",
                  break: 1,
                }),
                new TextRun({
                  text: ": All disputes between buyer sellers subject to contract between them.",
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
          ],
        },
      ],
    });

    docx.Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, `print_psic_${ref_no}.docx`);
      console.log("Document created successfully");
    });
  };

  return (
    <Button className="btn p-2" onClick={() => generate()}>
      <i className="fa fa-file-word mr-2" />
      PSIC
    </Button>
  );
}

export default Psic;
