import React from 'react'
import Img from 'gatsby-image'
import classNames from 'classnames/bind';
import isOdd from 'is-odd';
import Button from './button';

import styles from './article-preview.module.scss'
const cx = classNames.bind(styles);

export default ({ article, index }) => (
  <div className={cx('preview', { 'previewReverse': isOdd(index || 0) })}>
    <div className={styles.content}>
      <div className={styles.contentContainer}>
        <h3 className={styles.previewTitle}>
          Klant: Kolibrie
        </h3>
        <h3 className={styles.previewTitle}>
          {article.title}
        </h3>
        <small>{article.publishDate}</small>
        <p
          dangerouslySetInnerHTML={{
            __html: article.description.childMarkdownRemark.html,
          }}
        />
        <Button path={'/test'} title={'Lees meer'} />
      </div>
    </div>
    <div className={styles.heroImage}>
      <Img alt="" fluid={article.heroImage.fluid} />
    </div>
  </div>
)
