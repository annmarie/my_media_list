import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import styles from 'styles/components/Edit.module.scss';
import { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import dayjs from 'dayjs';
import { getItem, updateItem } from 'provider/localStorage';

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
  const [stateItem, setItem] = useState(0);

  const { status } = useQuery('subscription', async () => {
    return getItem(props).then((data) => {
      setItem(data);
      return data;
    });
  });

  if (status === 'loading') return <div>loading...</div>;

  const onSubmit = async (item) => {
    // parse input values
    _.set(item, 'price', parseFloat(_.get(item, 'price', 0)));
    const keys = ['name', 'frequency', 'price', 'description'];
    if (_.isEqual(_.pick(item, keys), _.pick(stateItem, keys))) {
      // Don't judge me for this next line.
      // I feel like I'm adding a blink tag to html
      // I'm just being lazy. ;)
      alert('nothing to update');
      return '';
      // We have things to update!
    } else {
      return updateItem(props, item).then((data) => setItem(data));
    }
  };

  return <UpdateForm {...props} item={stateItem} onSubmit={onSubmit} />;
}

function UpdateForm(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const { name, price, frequency, description, updated_at, created_at } = props.item || {};

  return (
    <div className={styles.edit}>
      <form onSubmit={handleSubmit(props.onSubmit)}>
        <input size="50" placeholder="name" {...register('name', { required: true })} defaultValue={name} />
        <ErrorMessage errors={errors} name="name" render={() => <div className="error">Name is required</div>} />
        <br />
        <input
          size="50"
          placeholder="price"
          {...register('price', { required: true, pattern: /^-?\d*\.?\d*$/ })}
          defaultValue={price} />
        <ErrorMessage
          errors={errors}
          name="price"
          render={() => <div className="error">Price is required and must be a number</div>} />
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
          defaultValue={description} />
        <br />
        <input type="submit" value="edit subscription" />
        <br />
        <ul>
          <li key="1">updated at: {dayjs(updated_at).format('MM/DD/YYYY HH:mm:ss')}</li>
          <li key="2">created at: {dayjs(created_at).format('MM/DD/YYYY HH:mm:ss')}</li>
        </ul>
      </form>
    </div>
  );
}
