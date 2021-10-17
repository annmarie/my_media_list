import _ from 'lodash';
import Link from 'next/link';
import Image from 'next/image';
import styles from 'styles/components/Home.module.scss';
import { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

export default function HomeComponent(props) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SubscriptionList {...props} />
    </QueryClientProvider>
  );
}

function SubscriptionList(props) {
  const [stateData, setData] = useState(0);
  const { status } = useQuery('subscriptions', () => {
    return new Promise((good) => {
      setTimeout(() => {
        try {
          const payload = [];
          for (let i = 0; i < localStorage.length; i++) {
            const storeKey = localStorage.key(i);
            if (storeKey.startsWith(props.localStorageKey)) {
              payload.push(JSON.parse(localStorage.getItem(storeKey)));
            }
          }
          if (payload.length) good({ status: 'success', payload });
          else good({ status: 'success' });
        } catch (error) {
          good({ error, status: 'fail' });
        }
      }, 8000)
    }).then((data) => {
      setData(data);
      return data;
    });
  });

  if (status === 'loading') return <div>loading...</div>;

  return _.get(stateData, 'payload') ? (
    <TableData {...props} data={stateData} setData={setData} />
  ) : (
    <InitButton {...props} setData={setData} />
  );
}

function InitButton(props) {
  // initialize demo data
  const initData = async () => {
    let demoData = {};
    const key = props.localStorageKey;
    // remove old kys
    for (let i = 0; i < localStorage.length; i++) {
      const storeKey = localStorage.key(i);
      if (storeKey.startsWith(props.localStorageKey)) {
        localStorage.removeItem(storeKey);
      }
    }
    try {
      const rset = await fetch('/api/data');
      demoData = await rset.json();
    } catch (err) {
      console.log('data not found');
      console.log(err);
    }
    _.get(demoData, 'payload', []).forEach((item) => {
      const storeKey = `${key}-${item.id}`;
      localStorage.setItem(storeKey, JSON.stringify(item));
    });
    props.setData(demoData);
  };

  return (
    <>
      <button onClick={initData}>Initialize The Experience</button>
    </>
  );
}

const TableData = (props) => {
  const [deleteList, setDeleteList] = useState([]);
  const removeSubscriptions = (ids) => {
    new Promise((good) => {
      try {
        for (let i = 0; i < ids.length; i++) {
          const id = ids[i];
          const key = props.localStorageKey;
          localStorage.removeItem(`${key}-${id}`);
        }
        good({ status: 'success' });
      } catch (error) {
        good({ error, status: 'fail' });
      }
    }).then((data) => {
      if (_.get(data, 'error')) return console.error(data);
      const payload = [];
      const oldPayload = props.data.payload;
      for (let i = 0; i < oldPayload.length; i++) {
        if (!ids.includes(oldPayload[i].id)) {
          payload.push(oldPayload[i]);
        }
      }
      if (payload.length) props.setData({ payload });
      else props.setData({});
    });
  };

  const deleteChecked = (_e) => {
    removeSubscriptions(deleteList);
    setDeleteList([]);
  };

  const onCheckChange = (e) => {
    const value = e.target.value;
    const checked = e.currentTarget.checked;
    const newDeleteList = [...deleteList];
    if (checked) {
      if (!newDeleteList.includes(value)) {
        newDeleteList.push(value);
        setDeleteList(newDeleteList);
      }
    } else {
      setDeleteList(newDeleteList.filter((id) => id != value));
    }
  };

  const displayRow = (item) => {
    return (
      <tr key={item.id} id={item.id}>
        <td>
          <Link href={`/subscription/${item.id}`}>
            <a>{item.name}</a>
          </Link>
        </td>
        <td>{item.price}</td>
        <td>{item.frequency}</td>
        <td onClick={() => removeSubscriptions([item.id])}>
          <Image alt="delete" src="/svgs/delete.svg" width="30px" height="30px" />
        </td>
        <td>
          <input type="checkBox" name="delete" value={item.id} onChange={onCheckChange} />
        </td>
      </tr>
    );
  };

  return (
    <div className={styles.home}>
      <DeleteListButtons {...props} deleteList={deleteList} />
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>price</th>
            <th>frequency</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>{_.get(props.data, 'payload', []).map(displayRow)}</tbody>
      </table>
    </div>
  );

  function DeleteListButtons(props) {
    if (props.deleteList.length)
      return (
        <div className="delButton">
          <button onClick={deleteChecked}>Delete Checked</button>
        </div>
      );
    else return '';
  }
};
