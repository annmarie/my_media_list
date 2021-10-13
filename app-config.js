const appConfig = {
  version: '1.0.0',
  title: 'My Media List',
  copyrightText: 'copyright notice',
  navLinks: [
    { id: 1, title: 'Home', path: '/' },
    { id: 2, title: 'Hello', path: '/hello' }
  ],
  localStorageKey: 'my-media-list',
  dataApiUrl: 'http://localhost:8080/api/data'
};

export default appConfig;
