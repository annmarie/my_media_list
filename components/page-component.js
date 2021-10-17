import { useRouter } from 'next/router';
import { useState } from 'react';
import HomeComponent from './home-component';
import EditComponent from './edit-component';
import CreateComponent from './create-component';
import NavigationComponent from 'components/navigation-component';


export default function PageComponent(props) {
  const router = useRouter();
  const asPath = router.asPath;

  switch (true) {
    case /\/subscription\/[^\/]*/.test(asPath):
      const id= asPath.replace('/subscription/', '');
      return (
        <>
          <NavigationComponent {...props} />
          <EditComponent id={id} {...props} />
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
