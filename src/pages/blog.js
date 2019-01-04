import React, { useState } from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import TagFilter from '../components/tag-filter';
import styles from './blog.module.scss'
import Layout from "../components/layout"
import ArticlePreview from '../components/article-preview'

const BlogIndex = ({ data, pageContext: { locale } }) => {
  const siteTitle = get(data, 'site.siteMetadata.title')
  const posts = get(data, 'allContentfulBlogPost.edges')
  
  const [tag, setTag] = useState(null);
  const filterPosts = !tag ? posts : posts.filter(({ node }) => ~node.tags.indexOf(tag));
  return (
    <Layout locale={locale} >
      <div style={{ background: '#fff' }}>
        <Helmet title={siteTitle} />
        <div className={styles.hero}>
          Blog
        </div>
        <TagFilter posts={posts} setTag={setTag} />
        <div className="wrapper">
          <h2 className="section-headline">Recent articles</h2>
          <ul className="article-list">
            {filterPosts.map(({ node }) => {
              return (
                <li key={node.slug}>
                  <ArticlePreview article={node} />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </Layout>
  )
}
export default BlogIndex

export const pageQuery = graphql`
  query BlogIndexQuery($locale: String = "en-US") {
    allContentfulBlogPost(
      sort: { fields: [publishDate], order: DESC }
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
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
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
  }
`
