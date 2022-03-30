require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const policy = {
  userAgent: '*',
};

if (process.env.ENVIRONMENT !== 'prod') {
  policy.disallow = '/';
}

module.exports = {
  siteMetadata: {
    siteUrl: "https://www.leadoutcapital.com",
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
    {
      resolve: "gatsby-source-airtable",
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        concurrency: 5,
        tables: [
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: process.env.CATEGORY_TITLE
          }
        ]
      }
    },
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: process.env.SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
      }
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        footnotes: true,
        gfm: true,
        plugins: []
      }
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.leadoutcapital.com',
        sitemap: [
          'https://www.leadoutcapital.com/sitemap/sitemap-index.xml',
        ],
        policy: [policy],
      },
    },
  ]
};
