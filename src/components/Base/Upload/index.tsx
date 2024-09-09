import { View } from '@tarojs/components';

import { ChooseImage } from '@/utils/auth';

/**
 * 上传图片组件包装 只处理上传和回调
 *
 * 内部不做任何处理 样式自行处置
 * @param {Props} props { children, onOk, count }
 * @returns
 */
export default function Upload(props: Props) {

  const { children, onOk, count = 1, className } = props;

  function handleUpload() {
    ChooseImage({
      count
    }).then(list => {
      onOk && onOk(count === 1 ? list[0] : list);
    });
  }

  return (
    <View className={`Upload-hakl542 ${className}`}>
      <View onClick={handleUpload}>
        {children}
      </View>
    </View>
  );
}

type Props = {
  className?: string
  count?: number
  children: React.ReactNode
  onOk?: (list: string[] | string) => void
}
