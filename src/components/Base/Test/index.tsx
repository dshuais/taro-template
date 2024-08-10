import { useAppStore, useSelector } from '@/store';

type Props = {
  title: string
}

export default function Test(props: Props) {

  const { title } = props;

  // const { token, SET_TOKEN } = useAppStore(state => state);
  const { token, SET_TOKEN } = useAppStore(useSelector(['token', 'SET_TOKEN']));

  return (
    <div className="text-purple-300">
      {title}
      <div>token: {token}</div>
      <button onClick={() => SET_TOKEN(token === '123' ? '456' : '123')}>set token</button>
    </div>
  );
}
