import { View } from '@tarojs/components';
import $toast from '@/utils/toast';
import { chooseLocation } from '@/utils/auth';

/**
 * 快捷打开地图选择位置
 * @returns
 */
export default function ChooseLocation(props: Props) {

  const { children, onOk, className } = props;

  // const [state, setState] = useSetState({
  //   longitude: 0,
  //   latitude: 0
  // });

  async function handleJumpMap() {
    $toast.loading();
    try {
      // let _latitude = state.latitude;
      // let _longitude = state.longitude;
      // if(!_latitude || !_longitude) {
      //   const { longitude, latitude } = await getLocation();
      //   // console.log('getLocation:>> ', longitude, latitude);
      //   _latitude = latitude;
      //   _longitude = longitude;
      // }
      // const data = await chooseLocation({
      //   longitude: _longitude,
      //   latitude: _latitude
      // });
      // const { latitude, longitude } = data;
      // console.log('chooseLocation:>> ', name, latitude, longitude);

      const data = await chooseLocation();

      onOk && onOk(data);

      // setState({
      //   longitude,
      //   latitude
      // });
      $toast.hide();
    } catch(error) {
      console.log('error:>> ', error);
      $toast.hide();
    }
  }

  return (
    <View onClick={handleJumpMap} className={className}>
      {children}
    </View>
  );
}

type Props = {
  children: React.ReactNode
  onOk?: (obj: Taro.chooseLocation.SuccessCallbackResult) => void
  className?: string
}
