import { useRouter } from 'next/router';
import HomeComponent from './home-component';
import EditComponent from './edit-component';
import CreateComponent from './create-component';

export default function PageComponent(props) {
  const router = useRouter();
  const asPath = router.asPath;

  switch (true) {
    case /\/subscription\/[^\/]*/.test(asPath):
      return <EditComponent id={asPath.replace('/subscription/', '')} {...props} />;
    case /\/subscription/.test(asPath):
      return <CreateComponent {...props} />;
    case /\//.test(asPath):
      return <HomeComponent {...props} />;
    default:
      return '';
  }
}
