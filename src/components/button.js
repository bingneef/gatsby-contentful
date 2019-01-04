import React from 'react'
import classNames from 'classnames/bind';

import Link from './link';
import styles from './button.module.scss'
const cx = classNames.bind(styles);

export default ({ title, path, type }) => (
  <Link className={cx('button', { buttonSecondary: type == 'secondary'})} to={`/blog`}>{ title }</Link>
)
