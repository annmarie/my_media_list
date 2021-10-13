import Link from 'next/link';
import _ from 'lodash';
import { useRouter } from 'next/router';

export default function NavigationComponent(props) {
  const router = useRouter();
  const asPath = _.get(router, 'asPath', '/');

  const makeNavLink = (link) => {
    const { id, title, path } = link;

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

  return (
    <nav>
      <ul>{props.navLinks.map(makeNavLink)}</ul>
    </nav>
  );
}
