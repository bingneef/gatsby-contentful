import React, { memo } from 'react'
import styles from './tag-filter.module.scss'

const TagFilter = ({posts, setTag}) => {
  let tags = [];
  for (let post of posts) {
    for (let tag of post.node.tags) {
      if (tags.indexOf(tag) == -1) {
        tags.push(tag);
      }
    }
  }

  return (
    <div className={styles.tagFilter}>
      { tags.map(tag => (
        <button key={tag} onClick={() => setTag(tag)}>{ tag }</button>
      ))}
      <button key={'clear'} onClick={() => setTag(null)}>Clear</button>
    </div>
  )
}

export default memo(TagFilter);