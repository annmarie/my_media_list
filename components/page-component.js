import styles from 'styles/components/Well.module.scss';
import { useRouter } from 'next/router';
import HomeComponent from './home-component';

export default function PageComponent(props) {
  const router = useRouter();
  const asPath = router.asPath;

  switch (asPath) {
    case '/subscription':
      return <div className={styles.hello}> create subscription</div>;
    case '/':
      return <HomeComponent {...props} />;
    default:
      return '';
  }
}
