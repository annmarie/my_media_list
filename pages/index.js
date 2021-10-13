import _ from 'lodash';
import appPageHandler from 'middleware/app-page-handler';
import appConfig from 'app-config';
import Head from 'next/head';
import HeaderComponent from 'components/header-component';
import FooterComponent from 'components/footer-component';
import NavigationComponent from 'components/navigation-component';
import PageComponent from 'components/page-component';

export default function Index(props) {
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

export async function getServerSideProps(ctx) {
  // middleware
  appPageHandler(ctx.req, ctx.res);

  // check query paths with navLinks list
  let queryPath = _.get(ctx, 'query.path', '');
  queryPath = _.isArray(queryPath) ? `/${queryPath.join('/')}` : `/${queryPath}`;
  const navPaths = appConfig.navLinks.map((navLink) => navLink.path);
  const validUrl = navPaths.includes(queryPath) ? true : false;
  // if no valid url path is found render 404 page
  if (!validUrl) return { notFound: true };

  // we only need to add the demo data on the home page
  if (queryPath === '/') {
    let data = {};
    try {
      const rset = await fetch(`${appConfig.dataApiUrl}`);
      data = await rset.json();
    } catch (err) {
      console.log('data not found');
      console.log(err);
    }
    _.set(appConfig, 'data', data);
  }

  // pass config data to page props
  return { props: { ...appConfig } };
}
