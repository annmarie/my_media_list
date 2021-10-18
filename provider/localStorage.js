import _ from 'lodash';

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

const parseTotals = (payload, totals, props) => {
  function getFrequencyTotals(key, payload) {
    return payload.reduce((total, item) => {
      let price = 0;
      if (item.frequency === key.toLowerCase()) {
        price = _.get(item, 'price', 0);
      }
      return total + price;
    }, 0);
  }

  const monthly = priceFormatter.format(getFrequencyTotals('monthly', payload));
  const yearly = priceFormatter.format(getFrequencyTotals('yearly', payload));
  _.set(totals, 'monthly', monthly, 0);
  _.set(totals, 'yearly', yearly, 0);
  _.set(totals, 'subscriptions', payload.length, 0);
  _.set(totals, 'pages', Math.ceil(payload.length / props.pageLimit));
  // set data results
  return { payload, totals };
};

export async function initData(props) {
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
  return parseTotals(payload, totals, props);
}

export async function getData(props) {
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
          const newData = parseTotals(payload, totals, props);
          // set data results
          good({ status: 'success', ...newData });
        } else {
          good({ status: 'success' });
        }
      } catch (error) {
        console.error(error);
        good({ error, status: 'fail' });
      }
    }, 0);
  });
}

export const deleteData = async (ids, props) => {
  return new Promise((good) => {
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
      return parseTotals(payload, totals, props);
    } else {
      return {};
    }
  });
};
