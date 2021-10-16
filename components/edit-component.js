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
      const id = _.get(props, 'id', 0);
      const key = props.localStorageKey;
      const storedData = localStorage.getItem(`${key}-${id}`);
      good(JSON.parse(storedData));
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
  const getNewDateFormatted = () => {
    const date = new Date().toJSON().slice(0, 10);
    return date.replace(/-/g, '');
  };
  const onSubmit = async (item) => {
    return new Promise((good) => {
      const id = props.id;
      const key = props.localStorageKey;
      if (id) {
        _.set(item, 'id', id);
        _.set(item, 'created_at', props.item.created_at);
        _.set(item, 'updated_at', getNewDateFormatted());
        localStorage.setItem(`${key}-${id}`, JSON.stringify(item));
        good(item);
      } else {
        good(props.item);
      }
    }).then((data) => props.setItem(data));
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const { name, price, frequency, description, updated_at, created_at } = props.item || {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="name" {...register('name', { required: true })} defaultValue={name} />
      <ErrorMessage errors={errors} name="name" render={() => <div className="error">Name is required</div>} />
      <br />
      <input
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
      <input placeholder="frequency" {...register('frequency', { required: true })} defaultValue={frequency} />
      <ErrorMessage
        errors={errors}
        name="frequency"
        render={() => <div className="error">Frequency is required and should be a select</div>}
      />
      <br />
      <input placeholder="description" {...register('description', { required: false })} defaultValue={description} />
      <br />
      <input type="submit" />
      <br />
      <ul>
        <li key={updated_at}>updated at: {updated_at}</li>
        <li key={created_at}>created at: {created_at}</li>
      </ul>
    </form>
  );
}
