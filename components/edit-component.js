import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import styles from 'styles/components/Edit.module.scss';
import { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

export default function EditComponent(props) {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SubscriptionEdit {...props} />
      </QueryClientProvider>
    </>
  );
}

function SubscriptionEdit(props) {
  const [stateData, setData] = useState(0);
  const { status } = useQuery('subscription', async () => {
    return new Promise((good) => {
      try {
        const id = _.get(props, 'id', 0);
        const key = props.localStorageKey;
        const storedData = localStorage.getItem(`${key}-${id}`);
        good(JSON.parse(storedData));
      } catch (error) {
        good({ error, status: 'fail' });
      }
    }).then((data) => {
      setData(data);
      return data;
    });
  });

  if (status === 'loading') return <div>loading...</div>;

  return (
    <div className={styles.edit}>
      <SubscriptionForm {...props} item={stateData} setItem={setData} />
    </div>
  );
}

function SubscriptionForm(props) {
  const onSubmit = async (item, oldItem) => {
    // parse input values
    _.set(item, 'price', parseFloat(_.get(item, 'price', 0)));
    const keys = ['name', 'frequency', 'price', 'description'];
    if (_.isEqual(_.pick(item, keys), _.pick(oldItem, keys))) {
      // I feel like I'm adding a blink tag to html
      // Don't judge me for this next line.
      // I'm just being lazy. ;)
      alert('nothing to update');
      return '';
      // We have things to update!
    } else {
      return new Promise((good) => {
        setTimeout(() => {
          try {
            const id = props.id;
            const key = props.localStorageKey;
            if (id) {
              _.set(item, 'id', id);
              _.set(item, 'created_at', props.item.created_at);
              _.set(item, 'updated_at', Date.now());
              localStorage.setItem(`${key}-${id}`, JSON.stringify(item));
              good(item);
            } else {
              good(props.item);
            }
          } catch (e) {
            console.error(e);
            good(props.item);
          }
        }, 8000)
      }).then((data) => props.setItem(data));
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const origItem = props.item || {};
  const { name, price, frequency, description, updated_at, created_at } = origItem;

  return (
    <form onSubmit={handleSubmit((item) => onSubmit(item, origItem))}>
      <input size="50" placeholder="name" {...register('name', { required: true })} defaultValue={name} />
      <ErrorMessage errors={errors} name="name" render={() => <div className="error">Name is required</div>} />
      <br />
      <input
        size="50"
        placeholder="price"
        {...register('price', { required: true, pattern: /^-?\d*\.?\d*$/ })}
        defaultValue={price}
      />
      <ErrorMessage
        errors={errors}
        name="price"
        render={() => <div className="error">Price is required and must be a number</div>}
      />
      <br />
      <select size="2" {...register('frequency')} defaultValue={frequency}>
        <option value="monthly">monthly</option>
        <option value="annually">annually</option>
      </select>
      <br />
      <input
        size="50"
        placeholder="description"
        {...register('description', { required: false })}
        defaultValue={description}
      />
      <br />
      <input type="submit" />
      <br />
      <ul>
        <li key="1">updated at: {updated_at}</li>
        <li key="2">created at: {created_at}</li>
      </ul>
    </form>
  );
}
