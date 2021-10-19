import _ from 'lodash';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import styles from 'styles/components/Home.module.scss';
import { useRouter } from 'next/router';
import { initData, getData, deleteData } from 'provider/localStorage';

export default function HomeComponent(props) {
  const queryClient = new QueryClient();
  const router = useRouter();
  const { page } = router.query;
  const pageNum = parseInt(page) || 1;
  const offset = (pageNum - 1) * props.pageLimit;

  return (
    <QueryClientProvider client={queryClient}>
      <HomePage {...props} page={pageNum} offset={offset} />
    </QueryClientProvider>
  );
}

function HomePage(props) {
  const [stateData, setData] = useState(0);
  const { status } = useQuery('subscriptions', async () => {
    return getData(props).then((data) => {
      setData(data);
      return data;
    });
  });

  if (status === 'loading') return <div>loading...</div>;

  return _.get(stateData, 'payload') ? (
    <>
      <SubscriptionList {...props} data={stateData} setData={setData} />
      <Totals {...props} data={stateData} />
    </>
  ) : (
    <InitButton {...props} setData={setData} />
  );
}

function InitButton(props) {
  const initClick = (_e) => {
    initData(props).then((data) => props.setData(data));
  };
  return (
    <>
      <button onClick={initClick}>Initialize The Experience</button>
      {' or '}
      <Link href="/subscription">
        <a>
          <button>Make Your Own Data</button>
        </a>
      </Link>
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

function SubscriptionList(props) {
  const router = useRouter();
  const [deleteList, setDeleteList] = useState([]);

  const removeSubscriptions = async (ids) => {
    return deleteData(ids, props).then((data) => {
      const totals = _.get(data, 'totals');
      if (totals) {
        const totalPages = _.get(totals, 'pages', 1);
        if (props.page > totalPages) {
          router.push(`/?page=${totalPages}`);
        }
      }
      props.setData(data);
    });
  };

  function DeleteButtons(props) {
    const deleteChecked = () => {
      removeSubscriptions(deleteList);
      setDeleteList([]);
    };

    const deleteAll = () => {
      removeSubscriptions(props.data.payload.map((i) => i.id));
      setDeleteList([]);
    };

    if (props.deleteList.length)
      return (
        <div className="delButton">
          <span>
            <button onClick={deleteAll}>Delete All</button>
          </span>
          {'  '}
          <span>
            <button onClick={deleteChecked}>Delete Checked</button>
          </span>
        </div>
      );
    else return '';
  }

  const Row = (item) => {
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

    return (
      <tr key={item.id} id={item.id}>
        <td>
          <Link href={`/subscription/${item.id}`}>
            <a>{item.name}</a>
          </Link>
        </td>
        <td>{props.formatPrice(item.price)}</td>
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
      <PrevNext {...props} />
      <DeleteButtons
        {...props}
        deleteList={deleteList}
        removeSubscriptions={removeSubscriptions}
        setDeleteList={setDeleteList}
        initData={initData}
      />
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
            .map(Row)}
        </tbody>
      </table>
    </div>
  );
}

const PrevNext = (props) => {
  const page = props.page;
  const { pages } = { ...props.data.totals };
  const pageLink = (key, text) => {
    if (key === page) return <a>{text}</a>;
    const href = `/?page=${key}`;
    return (
      <span className="active">
        <Link href={href}>
          <a>{text}</a>
        </Link>
      </span>
    );
  };

  return pages > 1 ? (
    <span className={styles.pagination}>
      {page > 1 ? pageLink(1, '<<') : ''}
      {page > 1 ? pageLink(page - 1, '<') : ''}
      {Array(pages)
        .fill(0)
        .map((_v, i) => {
          const key = i + 1;
          return pageLink(key, key);
        })}
      {page < pages ? pageLink(page + 1, '>') : ''}
      {page < pages ? pageLink(pages, '>>') : ''}
    </span>
  ) : (
    ''
  );
};
