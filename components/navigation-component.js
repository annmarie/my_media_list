import Link from 'next/link';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import styles from 'styles/components/Navigation.module.scss';

export default function NavigationComponent(props) {
  const router = useRouter();
  const asPath = _.get(router, 'asPath', '/');

  const makeNavLink = (link) => {
    const id = uuidv4();
    const { title, path } = link;
    return asPath == path ? (
      <li key={id}>{title}</li>
    ) : (
      <li key={id}>
        <Link href={path}>
          <a>{title}</a>
        </Link>
      </li>
    );
  };

  return props.navOff ? (
    ''
  ) : (
    <nav className={styles.navigation}>
      <ul>{props.navLinks.map(makeNavLink)}</ul>
    </nav>
  );
}
