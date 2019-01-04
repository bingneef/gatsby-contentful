const Promise = require('bluebird')
const path = require('path')
const locales = require('./src/constants/locales')

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  return new Promise(resolve => {
    deletePage(page)

    Object.keys(locales).map(lang => {
      const localizedPath = locales[lang].default
        ? page.path
        : locales[lang].path + page.path
      return createPage({
        ...page,
        path: localizedPath,
        context: {
          locale: lang
        }
      })
    })

    resolve()
  })
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    resolve(
      graphql(
        `
          {
            allContentfulBlogPost{
              edges {
                node {
                  title
                  slug
                  node_locale
                }
              }
            }
          }
          `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulBlogPost.edges
        posts.forEach((post, index) => {
          let path = `/blog/${post.node.slug}/`
          if (post.node.node_locale !== 'en-US') {
            path = `/${post.node.node_locale}${path}`
          }
          createPage({
            path: `/blog/${post.node.slug}/`,
            component: blogPost,
            context: {
              locale: post.node.node_locale,
              slug: post.node.slug
            },
          })
        })
      })
    )
  })
}
