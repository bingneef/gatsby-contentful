import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'

const RootIndex = ({ data, pageContext: { locale } }) => {
  const siteTitle = get(data, 'site.siteMetadata.title')
  const posts = get(data, 'allContentfulBlogPost.edges')
  const [author] = get(data, 'allContentfulPerson.edges')

  return (
    <Layout locale={locale} >
      <div style={{ background: '#fff' }}>
        <Helmet title={siteTitle} />
        <Hero data={author.node} />
        {posts.map(({ node }, index) => <ArticlePreview index={index} key={node.slug} article={node} />)}
      </div>
    </Layout>
  )
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery($locale: String!) {
    
    allContentfulBlogPost(
      sort: { fields: [publishDate], order: DESC },
      filter: { node_locale: {eq: $locale } }
    ) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          node_locale
          heroImage {
            fluid(maxWidth: 720, maxHeight: 720, resizingBehavior: FILL) {
             ...GatsbyContentfulFluid
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    allContentfulPerson(
      filter: { 
        contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" }
      }
    ) {
      edges {
        node {
          name
          shortBio {
            shortBio
          }
          title
          heroImage: image {
            fluid(
              maxWidth: 1180
              maxHeight: 640
              resizingBehavior: FILL
            ) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`
