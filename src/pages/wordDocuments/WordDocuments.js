import * as fs from "fs";
import * as docx from "docx";
import { saveAs } from "file-saver";

// // import DocViewer from "react-doc-viewer";
// import { Document, Packer, Paragraph, TextRun } from "docx";
// import * as FileSaver from "file-saver";
// import { Button } from "reactstrap";
// import * as XLSX from "xlsx";

// const docs = new Document({
//   sections: [
//     {
//       properties: {},
//       children: [
//         new Paragraph({
//           children: [
//             new TextRun("Hello World"),
//             new TextRun({
//               text: "Foo Bar",
//               bold: true,
//             }),
//             new TextRun({
//               text: "\tGithub is the best",
//               bold: true,
//             }),
//           ],
//         }),
//       ],
//     },
//   ],
// });

// export const WordDocuments = Packer.toBuffer(docs).then((buffer) => {
//   fs.writeFileSync("My Document.docx", buffer);
// });

// // Used to export the file into a .docx file

// // Done! A file called 'My Document.docx' will be in your file system.

// // function WordDocuments() {
// //   const docs = [
// //     { uri: "https://url-to-my-pdf.pdf" },
// //     { uri: require("assets/pdf/done.pdf") }, // Local File
// //   ];

// //   return <DocViewer documents={docs} />;

// // }

// const WordDocuments = ({ csvData, fileName, setCsv, report }) => {
//   const fileType =
//     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
//   const fileExtension = ".docs";

//   const exportToCSV = (csvData, fileName) => {
// const data = Packer.toBuffer(docs).then((buffer) => {
//   fs.writeFileSync("My Document.docx", buffer);
// });
//     // const ws = XLSX.utils.json_to_sheet(csvData);
//     // const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
//     // const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//     // const data = new Blob([excelBuffer], { type: fileType });
//     FileSaver.saveAs(data, fileName + fileExtension);
//   };

//   return (
//     <Button
//       className="bg-gradient-info text-white"
//       onClick={(e) => {
//         exportToCSV(csvData, fileName);
//         setCsv([]);
//       }}
//     >
//       Download {report && "Report"}
//     </Button>
//   );
// };
// export default WordDocuments;

// import React from "react";
// import { render, Document, Text } from "redocx";

// function Documents() {
//   return (
//     <Document>
//       <Text>Hello World</Text>
//     </Document>
//   );
// }

// render(<Documents />, `${__dirname}/example.docx`);
// export default function WordDocuments() {
//   return <Document />;
// }

import React from "react";
import { Button } from "reactstrap";
const {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  AlignmentType,
  HeadingLevel,
  UnderlineType,
} = docx;

function WordDocuments() {
  const table = new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph("Hello ssksdjogoijhof")],
          }),
          new TableCell({
            children: [new Paragraph("aakash")],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph("chudail")],
          }),
          new TableCell({
            children: [new Paragraph("World")],
          }),
        ],
      }),
    ],
  });

  const generate = () => {
    const doc = new docx.Document({
      title: "Sample Document",
      description: "A brief example of using docx",
      styles: {
        paragraphStyles: [
          {
            id: "Heading1",
            name: "Heading 1",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              size: 28,
              bold: true,
              italics: true,
              color: "FF0000",
            },
            paragraph: {
              spacing: {
                after: 120,
              },
            },
          },
          {
            id: "Heading2",
            name: "Heading 2",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              size: 26,
              bold: true,
              underline: {
                type: UnderlineType.DOUBLE,
                color: "FF0000",
              },
            },
            paragraph: {
              spacing: {
                before: 240,
                after: 120,
              },
            },
          },
          {
            id: "aside",
            name: "Aside",
            basedOn: "Normal",
            next: "Normal",
            run: {
              color: "999999",
              italics: true,
            },
            paragraph: {
              indent: {
                left: 720,
              },
              spacing: {
                line: 276,
              },
            },
          },
          {
            id: "wellSpaced",
            name: "Well Spaced",
            basedOn: "Normal",
            quickFormat: true,
            paragraph: {
              spacing: {
                line: 276,
                before: 20 * 72 * 0.1,
                after: 20 * 72 * 0.05,
              },
            },
          },
          {
            id: "ListParagraph",
            name: "List Paragraph",
            basedOn: "Normal",
            quickFormat: true,
          },
        ],
      },
      numbering: {
        config: [
          {
            reference: "my-crazy-numbering",
            levels: [
              {
                level: 0,
                format: "lowerLetter",
                text: "%1)",
                alignment: AlignmentType.LEFT,
              },
            ],
          },
        ],
      },
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              text: "Test heading1, bold and italicized",
              heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph("Some simple content"),
            new Paragraph({
              text: "Test heading2 with double red underline",
              heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({
              text: "Option1",
              numbering: {
                reference: "my-crazy-numbering",
                level: 0,
              },
            }),
            new Paragraph({
              text: "Option5 -- override 2 to 5",
              numbering: {
                reference: "my-crazy-numbering",
                level: 0,
              },
            }),
            new Paragraph({
              text: "Option3",
              numbering: {
                reference: "my-crazy-numbering",
                level: 0,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "Some monospaced content",
                  font: {
                    name: "Monospace",
                  },
                }),
              ],
            }),
            new Paragraph({
              text: "An aside, in light gray italics and indented",
              style: "aside",
            }),
            new Paragraph({
              text: "This is normal, but well-spaced text",
              style: "wellSpaced",
            }),
            table,
            new Paragraph({
              children: [
                new TextRun({
                  text: "This is a bold run,",
                  bold: true,
                }),
                new TextRun(" switching to normal "),
                new TextRun({
                  text: "and then underlined ",
                  underline: {},
                }),
                new TextRun({
                  text: "and back to normal.",
                }),
              ],
            }),
          ],
        },
      ],
    });

    docx.Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, "example.docx");
      console.log("Document created successfully");
    });
  };

  return (
    <Button className="btn-success" onClick={() => generate()}>
      Click to generate document
    </Button>
  );
}

export default WordDocuments;

// import React from "react";

// import { saveAs } from "file-saver";
// import { Packer } from "docx";
// import { experiences, education, skills, achievements } from "./cv-data";
// import { DocumentCreator } from "./cv-generator";

// function WordDocuments() {
//   const generate = () => {
//     const documentCreator = new DocumentCreator();
//     const doc = documentCreator.create([
//       experiences,
//       education,
//       skills,
//       achievements,
//     ]);

//     Packer.toBlob(doc).then((blob) => {
//       console.log(blob);
//       saveAs(blob, "example.docx");
//       console.log("Document created successfully");
//     });
//   };

//   return (
//     <div>
//       <h1>Hello aakash!</h1>
//       <p>
//         Start editing to see some magic happen :)
//         <button onClick={generate}>Generate CV with docx!</button>
//       </p>
//     </div>
//   );
// }

// export default WordDocuments;
