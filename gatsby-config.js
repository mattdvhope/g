// const dotenv = require("dotenv");

// if (process.env.ENVIRONMENT !== "production") {
//   dotenv.config();
// }
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const { spaceId, accessToken } = process.env;

module.exports = {
  siteMetadata: {
    title: `Rohit Gupta`,
    description: `Personal Site`,
    author: `@rohitguptab`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId,
        accessToken
      }
    },
    {
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: '222946198915072',
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Matt Malone`,
        short_name: `Matt`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#333`,
        icon: `src/images/fev-birds.png` // This path is relative to the root of the site.
      }
    }, // To learn more, visit: https://gatsby.dev/offline // this (optional) plugin enables Progressive Web App + Offline functionality
    `gatsby-plugin-offline`
  ]
};
