import appPageHandler from 'middleware/app-page-handler';
import appConfig from 'app-config';
import Head from 'next/head';
import HeaderComponent from 'components/header-component';
import FooterComponent from 'components/footer-component';
import PageComponent from 'components/page-component';

export default function Index(props) {

  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <div className="main">
        <HeaderComponent {...props} />
        <PageComponent {...props} />
        <FooterComponent {...props} />
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  // middleware
  appPageHandler(ctx.req, ctx.res);

  // pass config data to page props
  return { props: { ...appConfig } };
}
