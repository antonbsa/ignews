import { SingInButton } from '../SingInButton';

import styles from './styles.module.scss';
import { ActiveLink } from '../activeLink';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ig.news" />
        <nav>
          <ActiveLink href="/" activeClassName={styles.active}>
            <span className={styles.active}>Home</span>
          </ActiveLink>
          <ActiveLink href="/posts" activeClassName={styles.active}>
            <span>Posts</span>
          </ActiveLink>
        </nav>

        <SingInButton />
      </div>
    </header>
  );
}