import _ from 'lodash';
import { useState, useEffect } from 'react';

export default function HomeComponent(props) {
  const [data, setData] = useState(0);

  useEffect(() => {
    const key = props.localStorageKey;
    const storedData = localStorage.getItem(key);
    if (storedData)
      try {
        const storedJson = JSON.parse(storedData);
        if (_.get(storedJson, 'payload')) setData(JSON.parse(storedData));
      } catch (e) {
        // catch error
      }
  }, [props, setData]);

  if (!data) {
    // initialize demo data
    const initData = async () => {
      const key = props.localStorageKey;
      let demoData = {};
      try {
        const rset = await fetch('/api/data');
        demoData = await rset.json();
      } catch (err) {
        console.log('data not found');
        console.log(err);
      }
      localStorage.setItem(key, JSON.stringify(demoData));
      setData(demoData);
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
