import { useEffect } from 'react';
import Error from 'next/error';
import appPageHandler from 'middleware/app-page-handler';
import styles from 'styles/components/Well.module.scss';
import appConfig from 'app-config';
import Head from 'next/head';
import { useRouter } from 'next/router';
import HeaderComponent from 'components/header-component';
import FooterComponent from 'components/footer-component';
import NavigationComponent from 'components/navigation-component';

export default function Index(props) {
  useEffect(() => {
    console.log(`Index rendered`);
    console.log(props);
  }, [props]);

  const router = useRouter();
  const PageComponent = getPageComponent(props, router.asPath);
  if (PageComponent === '') return <Error statusCode={404} />;

  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <div className="main">
        <HeaderComponent {...props} />
        <NavigationComponent {...props} />
        <PageComponent {...props} />
        <FooterComponent {...props} />
      </div>
    </>
  );
}

function getPageComponent(_props, asPath) {
  switch (asPath) {
    case '/hello':
      return () => <div className={styles.hello}> hello</div>
    case '/':
      return () => <h2>main</h2>;
    default:
      return '';
  }
}

export function getServerSideProps(ctx) {
  // middleware
  appPageHandler(ctx.req, ctx.res);

  // pass config data to page props
  return { props: { ...appConfig } };
}
