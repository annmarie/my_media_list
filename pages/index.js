import _ from 'lodash';
import appPageHandler from 'middleware/app-page-handler';
import appConfig from 'app-config';
import Head from 'next/head';
import HeaderComponent from 'components/header-component';
import FooterComponent from 'components/footer-component';
import PageComponent from 'components/page-component';

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

export default function Index(props) {
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <div className="main">
        <HeaderComponent {...props} />
        <PageComponent {...props} formatPrice={priceFormatter.format} />
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
