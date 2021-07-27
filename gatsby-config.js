require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "Leadout Site",
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-transition-link",
    "gatsby-plugin-fontawesome-css",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images/`,
      },
      __key: "images",
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        custom: {
          families: ["Gotham"],
          urls: ["/fonts/fonts.css"],
        },
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.svg$/
        }
      }
    },
    // {
    //   resolve: "gatsby-source-airtable",
    //   options: {
    //     apiKey: process.env.API_KEY,
    //     concurrency: 5, // default, see using markdown and attachments for more information
    //     tables: [
    //       {
    //         baseId: "appyr1aCGptBKe5MV",
    //         tableName: "Deal Flow",
    //         tableView: "Contact Leadout", // optional
    //         // queryName: `OPTIONAL_NAME_TO_IDENTIFY_TABLE`, // optionally default is false - makes all records in this table a separate node type, based on your tableView, or if not present, tableName, e.g. a table called "Fruit" would become "allAirtableFruit". Useful when pulling many airtables with similar structures or fields that have different types. See https://github.com/jbolda/gatsby-source-airtable/pull/52.
    //         // mapping: { "CASE_SENSITIVE_COLUMN_NAME": `VALUE_FORMAT` }, // optional, e.g. "text/markdown", "fileNode"
    //         // tableLinks: [`CASE`, `SENSITIVE`, `COLUMN`, `NAMES`], // optional, for deep linking to records across tables.
    //         // separateNodeType: false, // boolean, default is false, see the documentation on naming conflicts for more information
    //         // separateMapType: false, // boolean, default is false, see the documentation on using markdown and attachments for more information
    //       }
    //     ]
    //   }
    // }
  ]
};
