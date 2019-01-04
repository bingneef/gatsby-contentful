import React from 'react'
import Link from '../components/link';
import Button from '../components/button';

import styles from './hero.module.scss'

export default ({ data }) => (
  <div className={styles.hero}>
    <h2 className={styles.slogan}>Partner voor digitale<br />productinnovatie</h2>
    <div className={styles.deepLinkContainer}>
      <Link className={styles.deepLink} to={`/blog`}>Multi-sided Platforms</Link>
      <span className={styles.deepLinkSeperator}>|</span>
      <Link className={styles.deepLink} to={`/blog`}>Open Source Technology</Link>
      <span className={styles.deepLinkSeperator}>|</span>
      <Link className={styles.deepLink} to={`/blog`}>VR for Business</Link>
      <span className={styles.deepLinkSeperator}>|</span>
      <Link className={styles.deepLink} to={`/blog`}>Design Sprints</Link>
    </div>
    <div className={styles.newsItemContainer}>
      <span>Nieuws: </span>
      <Link className={styles.newsItem} to={`/blog`}>Er is een nieuwe versie van Android uit en dat vieren we met Pie!</Link>
    </div>
    <div className={styles.ctaContainer}>
      <Button path={'/test'} type='secondary' title={'Oplossingen'} />
      <Button path={'/test'} type='secondary' title={'Cases'} />
    </div>
  </div>
)
