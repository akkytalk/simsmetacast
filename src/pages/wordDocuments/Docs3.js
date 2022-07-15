import * as fs from "fs";
import * as docx from "docx";
import { saveAs } from "file-saver";

import React, { useEffect } from "react";
import { Button } from "reactstrap";
import { ImageRun, TabStop, WidthType } from "docx";

const PHONE_NUMBER = "07534563401";
const PROFILE_URL = "https://www.linkedin.com/in/dolan1";
const EMAIL = "docx@com";

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
  TabStopPosition,
  TabStopType,
} = docx;

const experiences = [
  {
    isCurrent: true,
    summary:
      "Full-stack developer working with Angular and Java. Working for the iShares platform",
    title: "Associate Software Developer",
    startDate: {
      month: 11,
      year: 2017,
    },
    company: {
      name: "BlackRock",
    },
  },
  {
    isCurrent: false,
    summary:
      "Full-stack developer working with Angular, Node and TypeScript. Working for the iShares platform. Emphasis on Dev-ops and developing the continous integration pipeline.",
    title: "Software Developer",
    endDate: {
      month: 11,
      year: 2017,
    },
    startDate: {
      month: 10,
      year: 2016,
    },
    company: {
      name: "Torch Markets",
    },
  },
  {
    isCurrent: false,
    summary:
      "Used ASP.NET MVC 5 to produce a diversity data collection tool for the future of British television.\n\nUsed AngularJS and C# best practices. Technologies used include JavaScript, ASP.NET MVC 5, SQL, Oracle, SASS, Bootstrap, Grunt.",
    title: "Software Developer",
    endDate: {
      month: 10,
      year: 2016,
    },
    startDate: {
      month: 3,
      year: 2015,
    },
    company: {
      name: "Soundmouse",
    },
  },
  {
    isCurrent: false,
    summary:
      "Develop web commerce platforms for constious high profile clients.\n\nCreated a log analysis web application with the Play Framework in Java, incorporating Test Driven Development. It asynchronously uploads and processes large (2 GB) log files, and outputs meaningful results in context with the problem. \n\nAnalysis  and  development  of  the payment system infrastructure and user accounts section to be used by several clients of the company such as Waitrose, Tally Weijl, DJ Sports, Debenhams, Ann Summers, John Lewis and others.\n\nTechnologies used include WebSphere Commerce, Java, JavaScript and JSP.",
    title: "Java Developer",
    endDate: {
      month: 10,
      year: 2014,
    },
    startDate: {
      month: 3,
      year: 2013,
    },
    company: {
      name: "Soundmouse",
    },
  },
];

const education = [
  {
    degree: "Master of Science (MSc)",
    fieldOfStudy: "Computer Science",
    notes:
      "Exam Results: 1st Class with Distinction, Dissertation: 1st Class with Distinction\n\nRelevant Courses: Java and C# Programming, Software Engineering, Artificial Intelligence, \nComputational Photography, Algorithmics, Architecture and Hardware.\n\nCreated a Windows 8 game in JavaScript for the dissertation. \n\nCreated an award-winning 3D stereoscopic game in C# using XNA.",
    schoolName: "University College London",
    startDate: {
      year: 2012,
    },
    endDate: {
      year: 2013,
    },
  },
  {
    degree: "Bachelor of Engineering (BEng)",
    fieldOfStudy: "Material Science and Engineering",
    notes:
      "Exam Results: 2:1, Dissertation: 1st Class with Distinction\n\nRelevant courses: C Programming, Mathematics and Business for Engineers.",
    schoolName: "Imperial College London",
    startDate: {
      year: 2009,
    },
    endDate: {
      year: 2012,
    },
  },
];

const skills = [
  {
    name: "Angular",
  },
  {
    name: "TypeScript",
  },
  {
    name: "JavaScript",
  },
  {
    name: "NodeJS",
  },
];

const achievements = [
  {
    issuer: "Oracle",
    name: "Oracle Certified Expert",
  },
];

function Docs3() {
  const table = new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                text: "Hello",
                heading: HeadingLevel.HEADING_1,

                style: {
                  fontSize: 48,
                  color: "red",
                  underline: UnderlineType.SINGLE,
                  tabStop: new TabStop({
                    type: TabStopType.LEFT,
                    position: TabStopPosition.DEFAULT,
                  }),
                },
              }),
            ],
            verticalAlignment: AlignmentType.CENTER,
          }),
          new TableCell({
            children: [
              new Paragraph({
                text: " aakash",
                heading: HeadingLevel.HEADING_1,
              }),
            ],
            verticalAlignment: AlignmentType.CENTER,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                text: "World",
                heading: HeadingLevel.HEADING_1,
              }),
            ],
          }),
        ],
      }),
    ],
    width: {
      size: 10000,
      type: WidthType.DXA,
    },
    // indent: {
    //   size: 600,
    //   type: WidthType.DXA,
    // },
  });

  //   const table = new Table({
  //     rows: [
  //       new TableRow({
  //         children: [
  //           new TableCell({
  //             children: [new Paragraph("Hello ssksdjogoijhof")],
  //           }),
  //           new TableCell({
  //             children: [new Paragraph("aakash")],
  //           }),
  //         ],
  //       }),
  //       new TableRow({
  //         children: [
  //           new TableCell({
  //             children: [new Paragraph("chudail")],
  //           }),
  //           new TableCell({
  //             children: [new Paragraph("World")],
  //           }),
  //         ],
  //       }),
  //     ],
  //   });

  const create = ([experiences, education, skills, achievements]) => {
    const document = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              text: "Dolan Miu",
              heading: HeadingLevel.TITLE,
            }),
            createContactInfo(PHONE_NUMBER, PROFILE_URL, EMAIL),
            createHeading("Education"),
            ...education
              .map((education) => {
                const arr = [];
                arr.push(
                  createInstitutionHeader(
                    education.schoolName,
                    `${education.startDate.year} - ${education.endDate.year}`
                  )
                );
                arr.push(
                  createRoleText(
                    `${education.fieldOfStudy} - ${education.degree}`
                  )
                );

                const bulletPoints = splitParagraphIntoBullets(education.notes);
                bulletPoints.forEach((bulletPoint) => {
                  arr.push(createBullet(bulletPoint));
                });

                return arr;
              })
              .reduce((prev, curr) => prev.concat(curr), []),
            createHeading("Experience"),
            ...experiences
              .map((position) => {
                const arr = [];

                arr.push(
                  createInstitutionHeader(
                    position.company.name,
                    createPositionDateText(
                      position.startDate,
                      position.endDate,
                      position.isCurrent
                    )
                  )
                );
                arr.push(createRoleText(position.title));

                const bulletPoints = splitParagraphIntoBullets(
                  position.summary
                );

                bulletPoints.forEach((bulletPoint) => {
                  arr.push(createBullet(bulletPoint));
                });

                return arr;
              })
              .reduce((prev, curr) => prev.concat(curr), []),
            createHeading("Skills, Achievements and Interests"),
            createSubHeading("Skills"),
            createSkillList(skills),
            createSubHeading("Achievements"),
            ...createAchivementsList(achievements),
            createSubHeading("Interests"),
            createInterests(
              "Programming, Technology, Music Production, Web Design, 3D Modelling, Dancing."
            ),
            createHeading("References"),
            new Paragraph(
              "Dr. Dean Mohamedally Director of Postgraduate Studies Department of Computer Science, University College London Malet Place, Bloomsbury, London WC1E d.mohamedally@ucl.ac.uk"
            ),
            new Paragraph("More references upon request"),
            new Paragraph({
              text: "This CV was generated in real-time based on my Linked-In profile from my personal website www.dolan.bio.",
              alignment: AlignmentType.CENTER,
            }),
            table,
          ],
        },
      ],
    });

    docx.Packer.toBlob(document).then((blob) => {
      console.log(blob);
      saveAs(blob, "gkp.docx");
      console.log("Document created successfully");
    });
  };

  const createContactInfo = (phoneNumber, profileUrl, email) => {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun(
          `Mobile: ${phoneNumber} | LinkedIn: ${profileUrl} | Email: ${email}`
        ),
        new TextRun({
          text: "Address: 58 Elm Avenue, Kent ME4 6ER, UK",
          break: 1,
        }),
      ],
    });
  };

  const createHeading = (text) => {
    return new Paragraph({
      text: text,
      heading: HeadingLevel.HEADING_1,
      thematicBreak: true,
    });
  };

  const createSubHeading = (text) => {
    return new Paragraph({
      text: text,
      heading: HeadingLevel.HEADING_2,
    });
  };

  const createInstitutionHeader = (institutionName, dateText) => {
    return new Paragraph({
      tabStops: [
        {
          type: TabStopType.RIGHT,
          position: TabStopPosition.MAX,
        },
      ],
      children: [
        new TextRun({
          text: institutionName,
          bold: true,
        }),
        new TextRun({
          text: `\t${dateText}`,
          bold: true,
        }),
      ],
    });
  };

  const createRoleText = (roleText) => {
    return new Paragraph({
      children: [
        new TextRun({
          text: roleText,
          italics: true,
        }),
      ],
    });
  };

  const createBullet = (text) => {
    return new Paragraph({
      text: text,
      bullet: {
        level: 0,
      },
    });
  };

  const createSkillList = (skills) => {
    return new Paragraph({
      children: [
        new TextRun(skills.map((skill) => skill.name).join(", ") + "."),
      ],
    });
  };

  const createAchivementsList = (achievements) => {
    return achievements.map(
      (achievement) =>
        new Paragraph({
          text: achievement.name,
          bullet: {
            level: 0,
          },
        })
    );
  };

  const createInterests = (interests) => {
    return new Paragraph({
      children: [new TextRun(interests)],
    });
  };

  const splitParagraphIntoBullets = (text) => {
    return text.split("\n\n");
  };

  const createPositionDateText = (startDate, endDate, isCurrent) => {
    const startDateText =
      getMonthFromInt(startDate.month) + ". " + startDate.year;
    const endDateText = isCurrent
      ? "Present"
      : `${getMonthFromInt(endDate.month)}. ${endDate.year}`;

    return `${startDateText} - ${endDateText}`;
  };

  const getMonthFromInt = (value) => {
    switch (value) {
      case 1:
        return "Jan";
      case 2:
        return "Feb";
      case 3:
        return "Mar";
      case 4:
        return "Apr";
      case 5:
        return "May";
      case 6:
        return "Jun";
      case 7:
        return "Jul";
      case 8:
        return "Aug";
      case 9:
        return "Sept";
      case 10:
        return "Oct";
      case 11:
        return "Nov";
      case 12:
        return "Dec";
      default:
        return "N/A";
    }
  };

  // useEffect(() => {
  //     app.get("/", async (req, res) => {
  //         const documentCreator = new DocumentCreator();
  //         const doc = documentCreator.create([experiences, education, skills, achievements]);

  //         const b64string = await Packer.toBase64String(doc);

  //         res.setHeader('Content-Disposition', 'attachment; filename=My Document.docx');
  //         res.send(Buffer.from(b64string, 'base64'));
  //         });
  // },[])

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
    <Button
      className="btn-success"
      onClick={() => create([experiences, education, skills, achievements])}
    >
      Click to generate document
    </Button>
  );
}

export default Docs3;
