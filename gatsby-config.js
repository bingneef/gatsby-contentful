let contentfulConfig

try {
  // Load the Contentful config from the .contentful.json
  contentfulConfig = require('./.contentful')
} catch (_) {}

// Overwrite the Contentful config with environment variables if they exist
contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID || contentfulConfig.spaceId,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN || contentfulConfig.accessToken,
  host: process.env.CONTENTFUL_HOST || undefined,
}

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the delivery token need to be provided.'
  )
}

module.exports = {
  pathPrefix: '/gatsby-contentful-starter',
  plugins: [
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Snowflake`,
        short_name: `Snowflake`,
        start_url: `/`,
        background_color: `#FFCC00`,
        theme_color: `#FFCC00`,
        display: `standalone`,
        icon: `src/assets/icon.png`, // This path is relative to the root of the site.
      }
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `red`,
        showSpinner: false,
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-netlify',
  ],
}
