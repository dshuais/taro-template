import { View, Image } from '@tarojs/components';

import './index.scss';

export default function UploadWrap(props: Props) {

  const { title, className, imgUrl } = props;

  return (
    <View className={`UploadWrap-ujt834s ${className}`}>
      {
        imgUrl ? <Image src={imgUrl} className="UploadWrap-img" mode="aspectFill" /> :
        <>
          <View className="UploadWrap-icon" />
          <View className="UploadWrap-title">{title}</View></>
      }
    </View>
  );
}

type Props = {
  title: string
  className?: string
  imgUrl?: string
}
