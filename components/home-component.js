import _ from 'lodash';
import Link from 'next/link';
import styles from 'styles/components/Home.module.scss';
import { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

export default function HomeComponent(props) {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SubscriptionList {...props} />
      </QueryClientProvider>
    </>
  );
}

function SubscriptionList(props) {
  const [stateData, setData] = useState(0);

  const { status, data } = useQuery('subscriptions', () => {
    return new Promise((good, bad) => {
      const storedData = localStorage.getItem(props.localStorageKey);
      if (storedData) {
        try {
          const storedJson = JSON.parse(storedData);
          if (_.get(storedJson, 'payload')) {
            good(storedJson);
          } else {
            // invalid local storage found return empty data set
            good({});
          }
        } catch (e) {
          bad(e);
        }
      }
      // no local storage found return empty data set
      good({});
    }).then((data) => data);
  });

  if (status === 'loading') return <div>loading...</div>;
  else if (status === 'success' && !stateData) setData(data);

  return _.get(stateData, 'payload') ? <TableData {...stateData} /> : <InitButton {...props} setData={setData} />;
}

function InitButton(props) {
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
    props.setData(demoData);
  };

  return (
    <>
      <button onClick={initData}>Initialize The Experience</button>
    </>
  );
}

const TableData = (subscriptions) => {
  const displayData = (item) => {
    const href = `/subscription/${item.id}`;
    return (
      <tr key={item.id} id={item.id}>
        <td>
          <Link href={href}>
            <a>{item.name}</a>
          </Link>
        </td>
        <td>{item.price}</td>
        <td>{item.frequency}</td>
        <td><img src="/svgs/delete.svg" width="30px" height="30px" /></td>
      </tr>
    );
  };

  return (
    <div className={styles.home}>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>price</th>
            <th>frequency</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{_.get(subscriptions, 'payload', []).map(displayData)}</tbody>
      </table>
    </div>
  );
};
