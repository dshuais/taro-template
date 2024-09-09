import { Button, type ButtonProps } from '@tarojs/components';

import './index.scss';

export default function PhoneButton(props: Props) {

  const { onOk, children } = props;

  function onGetPhoneNumber(e) {
    console.log('onGetPhoneNumber:>> ', e);
    onOk && onOk(e.detail, e);
  }

  return (
    <Button className="PhoneButton-oiu83s4" openType="getPhoneNumber" onGetPhoneNumber={onGetPhoneNumber}>
      {children}
    </Button>
  );
}

type Props = {
  onOk?: (detail: ButtonProps.onGetPhoneNumberEventDetail, e: any) => void;
  children?: React.ReactNode;
}
