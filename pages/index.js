import appPageHandler from 'middleware/app-page-handler';
import appConfig from 'app-config';
import otherPaths from 'other-paths';
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

  // check query paths
  let [queryPath] = ctx.req.url.split('?');
  queryPath = queryPath.startsWith('/_next') ? '/' : queryPath;
  const navPaths = appConfig.navLinks.map((navLink) => navLink.path);
  const validNavPaths = navPaths.includes(queryPath) ? true : false;
  const otherPathsCheck = otherPaths.map((otherPath) => !!queryPath.match(otherPath));
  const validOtherPaths = !otherPathsCheck.includes(false);
  const validUrl = validNavPaths || validOtherPaths;
  // if no valid url path is found render 404 page
  if (!validUrl) return { notFound: true };

  // pass config data to page props
  return { props: { ...appConfig } };
}
