import _ from 'lodash';
import { useRouter } from 'next/router';
import HomeComponent from './home-component';
import EditComponent from './edit-component';
import CreateComponent from './create-component';
import NavigationComponent from 'components/navigation-component';

export default function PageComponent(props) {
  const router = useRouter();
  const [asPath] = _.get(router, 'asPath', '/').split('?');

  switch (true) {
    case /\/subscription\/[^\/]*/.test(asPath):
      return (
        <>
          <NavigationComponent {...props} />
          <EditComponent id={asPath.replace('/subscription/', '')} {...props} />
        </>
      );
    case /\/subscription/.test(asPath):
      return (
        <>
          <NavigationComponent {...props} />
          <CreateComponent {...props} />
        </>
      );
    default:
      return (
        <>
          <NavigationComponent {...props} />
          <HomeComponent {...props} />
        </>
      );
  }
}
