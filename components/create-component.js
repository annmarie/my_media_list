import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import styles from 'styles/components/Create.module.scss';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

export default function CreateComponent(props) {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SubscriptionCreate {...props} />
      </QueryClientProvider>
    </>
  );
}

function SubscriptionCreate(props) {
  const { status, data } = useQuery('subscriptions', async () => {
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

  return (
    <div className={styles.edit}>
      <SubscriptionForm {...props} data={data} />
    </div>
  );
}

function SubscriptionForm(_props) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="name" {...register('name', { required: true })} />
      <ErrorMessage errors={errors} name="name" render={() => <div className="error">Name is required</div>} />
      <br />
      <input placeholder="price" {...register('price', { required: true, pattern: /^-?\d*\.?\d*$/ })} />
      <ErrorMessage
        errors={errors}
        name="price"
        render={() => <div className="error">Price is required and must be a number</div>}
      />
      <br />
      <input placeholder="frequency" {...register('frequency', { required: true })} />
      <ErrorMessage
        errors={errors}
        name="frequency"
        render={() => <div className="error">Frequency is required and should be a select</div>}
      />
      <br />
      <input placeholder="description" {...register('description', { required: false })} />
      <br />
      <input type="submit" />
      <br />
    </form>
  );
}
