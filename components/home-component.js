import _ from 'lodash';
import { useState, useEffect } from 'react';

export default function HomeComponent(props) {
  const [data, setData] = useState(0);

  useEffect(() => {
    const key = props.localStorageKey;
    const storedData = localStorage.getItem(key);
    if (storedData)
      try {
        setData(JSON.parse(storedData));
      } catch (e) {
        // catch error
      }
  }, [props, setData]);

  if (!data) {
    const initData = () => {
      const demoData = JSON.stringify(props.data);
      const key = props.localStorageKey;
      localStorage.setItem(key, demoData);
      setData(props.data);
    };

    return (
      <>
        <button onClick={initData}>Initialize The Experience</button>
      </>
    );
  }

  const displayData = (item) => {
    return <div>{JSON.stringify(item)}</div>;
  };

  return (
    <>
      <ul>{_.get(data, 'payload', []).map(displayData)}</ul>
    </>
  );
}
