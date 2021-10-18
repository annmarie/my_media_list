import _ from 'lodash';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import styles from 'styles/components/Home.module.scss';
import { useRouter } from 'next/router';
const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});
const getFrequencyTotals = (key, payload) => {
  return payload.reduce((total, item) => {
    let price = 0;
    if (item.frequency === key.toLowerCase()) {
      price = _.get(item, 'price', 0);
    }
    return total + price;
  }, 0);
};

export default function HomeComponent(props) {
  const queryClient = new QueryClient();
  const router = useRouter();
  const { page } = router.query;
  const pageNum = parseInt(page) || 1;
  const offset = (pageNum - 1) * props.pageLimit;

  return (
    <QueryClientProvider client={queryClient}>
      <SubscriptionList {...props} page={pageNum} offset={offset} />
    </QueryClientProvider>
  );
}

function SubscriptionList(props) {
  const [stateData, setData] = useState(0);
  const { status } = useQuery('subscriptions', async () => {
    return new Promise((good) => {
      setTimeout(() => {
        try {
          const payload = [];
          const totals = {};
          for (let i = 0; i < localStorage.length; i++) {
            const storeKey = localStorage.key(i);
            if (storeKey.startsWith(props.localStorageKey)) {
              payload.push(JSON.parse(localStorage.getItem(storeKey)));
            }
          }
          if (payload.length) {
            const monthly = priceFormatter.format(getFrequencyTotals('monthly', payload));
            const yearly = priceFormatter.format(getFrequencyTotals('yearly', payload));
            _.set(totals, 'monthly', monthly, 0);
            _.set(totals, 'yearly', yearly, 0);
            _.set(totals, 'subscriptions', payload.length, 0);
            _.set(totals, 'pages', Math.ceil(payload.length / props.pageLimit));
            // set data results
            good({ status: 'success', payload, totals });
          } else {
            good({ status: 'success' });
          }
        } catch (error) {
          console.error(error);
          good({ error, status: 'fail' });
        }
      }, 0);
    }).then((data) => {
      setData(data);
      return data;
    });
  });

  if (status === 'loading') return <div>loading...</div>;

  return _.get(stateData, 'payload') ? (
    <>
      <TableData {...props} data={stateData} setData={setData} />
      <Totals {...props} data={stateData} />
    </>
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
    } catch (error) {
      console.error('data not found');
      console.error(error);
    }
    const payload = _.get(demoData, 'payload', []);
    const totals = {};
    payload.forEach((item) => {
      const storeKey = `${key}-${item.id}`;
      localStorage.setItem(storeKey, JSON.stringify(item));
    });
    const monthly = priceFormatter.format(getFrequencyTotals('monthly', payload));
    const yearly = priceFormatter.format(getFrequencyTotals('yearly', payload));
    _.set(totals, 'monthly', monthly, 0);
    _.set(totals, 'yearly', yearly, 0);
    _.set(totals, 'subscriptions', payload.length, 0);
    _.set(totals, 'pages', Math.ceil(payload.length / props.pageLimit));

    props.setData({ payload, totals });
  };

  return (
    <>
      <button onClick={initData}>Initialize The Experience</button>
    </>
  );
}

function Totals(props) {
  const { totals } = { ...props.data };

  return totals ? (
    <div className={styles.totals}>
      <ul>
        <li>monthly subscription cost: {totals.monthly}</li>
        <li>yearly subscription cost: {totals.yearly}</li>
        <li>total number of subscriptions: {totals.subscriptions}</li>
      </ul>
    </div>
  ) : (
    ''
  );
}

function TableData(props) {
  const router = useRouter();
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
      const totals = {};
      const oldPayload = props.data.payload;
      for (let i = 0; i < oldPayload.length; i++) {
        if (!ids.includes(oldPayload[i].id)) {
          payload.push(oldPayload[i]);
        }
      }
      if (payload.length) {
        const monthly = priceFormatter.format(getFrequencyTotals('monthly', payload));
        const yearly = priceFormatter.format(getFrequencyTotals('yearly', payload));
        _.set(totals, 'monthly', monthly, 0);
        _.set(totals, 'yearly', yearly, 0);
        _.set(totals, 'subscriptions', payload.length, 0);
        _.set(totals, 'pages', Math.ceil(payload.length / props.pageLimit));
        // set data results
        props.setData({ payload, totals });
        const totalPages = _.get(totals, 'pages', 1);
        if (props.page > totalPages) router.push(`/?page=${totalPages}`);
      } else {
        props.setData({});
      }
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
        <td>{priceFormatter.format(item.price)}</td>
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

  const DeleteListButtons = (props) => {
    if (props.deleteList.length)
      return (
        <div className="delButton">
          <button onClick={deleteChecked}>Delete Checked</button>
        </div>
      );
    else return '';
  };

  const PrevNext = (props) => {
    const page = props.page;
    const { pages } = { ...props.data.totals };
    const pageLink = (page, text) => {
      const href = `/?page=${page}`;
      return (
        <>
          <Link href={href}>
            <a>{text}</a>
          </Link>
        </>
      );
    };

    return pages > 1 ? (
      <span>
        {(page > 1) ? pageLink(1, '<<') : '<<'}
        {' | '}
        {page > 1 ? pageLink(page - 1, '<') : '<'}
        {' | '}
        {page < pages ? pageLink(page + 1, '>') : '>'}
        {' | '}
        {(page < pages) ? pageLink(pages, '>>') : '>>'}
      </span>
    ) : (
      ''
    );
  };

  return (
    <div className={styles.home}>
      <PrevNext {...props} />
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
        <tbody>
          {_.get(props.data, 'payload', [])
            .slice(props.offset, props.offset + props.pageLimit)
            .map(displayRow)}
        </tbody>
      </table>
    </div>
  );
}
