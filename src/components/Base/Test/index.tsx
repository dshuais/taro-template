
type Props = {
  title: string
}

export default function Test(props: Props) {

  const { title } = props;

  return (
    <div className="text-purple-300">{title}</div>
  );
}
