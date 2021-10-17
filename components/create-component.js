import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { v4 as uuidv4 } from 'uuid';
import styles from 'styles/components/Create.module.scss';
import { useRouter } from 'next/router';

export default function CreateComponent(props) {
  return (
    <div className={styles.edit}>
      <SubscriptionForm {...props} />
    </div>
  );
}

function SubscriptionForm(props) {
  const router = useRouter();
  const onSubmit = async (item) => {
    return new Promise((good) => {
      setTimeout(() => {
        try {
          const id = uuidv4();
          const key = props.localStorageKey;
          if (id) {
            _.set(item, 'id', id);
            _.set(item, 'created_at', Date.now());
            _.set(item, 'updated_at', Date.now());
            localStorage.setItem(`${key}-${id}`, JSON.stringify(item));
            good(item);
          } else {
            good({});
          }
        } catch (e) {
          console.error(e);
          good({});
        }
      }, 0);
    }).then((data) => {
      const id = data.id;
      if (id) router.push(`/subscription/${id}`);
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input size="50" placeholder="name" {...register('name', { required: true })} />
      <ErrorMessage errors={errors} name="name" render={() => <div className="error">Name is required</div>} />
      <br />
      <input size="50" placeholder="price" {...register('price', { required: true, pattern: /^-?\d*\.?\d*$/ })} />
      <ErrorMessage
        errors={errors}
        name="price"
        render={() => <div className="error">Price is required and must be a number</div>}
      />
      <br />
      <select size="2" {...register('frequency')} defaultValue={'monthly'}>
        <option value="monthly">monthly</option>
        <option value="annually">annually</option>
      </select>
      <br />
      <input size="50" placeholder="description" {...register('description', { required: false })} />
      <br />
      <input type="submit" />
      <br />
    </form>
  );
}
