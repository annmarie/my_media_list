import styles from 'styles/components/Well.module.scss';
import { useRouter } from 'next/router';
import HomeComponent from './home-component';
import EditComponent from './edit-component';

export default function PageComponent(props) {
  const router = useRouter();
  const asPath = router.asPath;

  switch (true) {
    case /\/subscription\/[^\/]*/.test(asPath):
      return <EditComponent id={asPath.replace('/subscription/', '')} {...props} />;
    case /\/subscription/.test(asPath):
      return <div className={styles.hello}> create subscription</div>;
    case /\//.test(asPath):
      return <HomeComponent {...props} />;
    default:
      return '';
  }
}
