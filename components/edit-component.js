import _ from 'lodash';
import { useForm } from 'react-hook-form';
//import styles from 'styles/components/Home.module.scss';
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
  //const [stateData, setData] = useState(0);

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
    }).then((data) => {
      const id = props.id;
      return _.find(_.get(data, 'payload', {}), { id });
    });
  });

  if (status === 'loading') return <div>loading...</div>;

  return (
    <div>
      {JSON.stringify(data)}
      <br />
      {props.id}
      <SubscriptionForm {...props} item={data} />
    </div>
  );
}

function SubscriptionForm(_props) {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('firstName', { required: true, maxLength: 20 })} />
      <br />
      <input {...register('lastName', { pattern: /^[A-Za-z]+$/i })} />
      <br />
      <input type="submit" />
      <br />
    </form>
  );
}
