import styles from './Home.module.scss';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import { useForm, Controller, ControllerRenderProps, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string()
    .min(3, 'must be at least 3 characters long')
    .email('must be a valid email'),
  password: yup.string(),
}).required();

const EmailInput = (props: ControllerRenderProps<FieldValues>) => (
  <Input id="email" aria-describedby="Your email" type="email" {...props} />
);

const PasswordInput = (props: ControllerRenderProps<FieldValues>) => (
  <Input id="password" aria-describedby="your password" type="password" {...props} />
);

export default function Home() {
  const { register, handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  return (
    <div className={styles.wrapper}>
      <form className="form_wrapper" onSubmit={handleSubmit(data => console.log(['🚀 Yolo ', data]))}>
        <Paper>
          <div className="form_header">
            <h1>Login</h1>
          </div>
          <div className="form_body">
            <InputLabel htmlFor="email">Email address</InputLabel>
            <Controller
              render={({ field }) => <EmailInput {...field} />}
              name="email"
              control={control}
              defaultValue=""
            />
            <InputLabel htmlFor="password">Password</InputLabel>
            <Controller
              render={({ field }) => <PasswordInput {...field} />}
              name="password"
              control={control}
              defaultValue=""
            />
          </div>
          <div>
            <Button type="submit">Submit</Button>
          </div>
        </Paper>
      </form>
    </div>
  )
}