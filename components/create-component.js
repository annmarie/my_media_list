import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import styles from 'styles/components/Create.module.scss';
import { useRouter } from 'next/router';
import { saveItem } from 'provider/localStorage';

export default function CreateComponent(props) {
  return (
    <div className={styles.edit}>
      <SubscriptionCreate {...props} />
    </div>
  );
}

function SubscriptionCreate(props) {
  const router = useRouter();
  const onSubmit = async (item) => {
    // parse input values
    _.set(item, 'price', parseFloat(_.get(item, 'price', 0)));
    return saveItem(props, item).then((data) => {
      const id = data.id;
      if (id) router.push(`/subscription/${id}`);
    });
  };

  return <SaveForm {...props} onSubmit={onSubmit} />;
}

function SaveForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
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
        <option value="yearly">yearly</option>
      </select>
      <br />
      <input size="50" placeholder="description (optional)" {...register('description', { required: false })} />
      <br />
      <input type="submit" value="create subscription" />
      <br />
    </form>
  );
}
