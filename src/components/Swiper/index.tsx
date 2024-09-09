/*
 * @Author: dushuai
 * @Date: 2024-08-28 17:51:02
 * @LastEditors: dushuai
 * @LastEditTime: 2024-08-28 20:32:36
 * @description: Swiper
 */
import { Swiper, SwiperItem, Image } from '@tarojs/components';
import { useSetState } from 'ahooks';

export default function SwiperComponent(props: Props) {

  const { list, className = '' } = props;

  const [state, setState] = useSetState({
    current: 0
  });

  function onChange(e: any) {
    setState({ current: e.detail.current || 0 });
  }

  if(!list || list.length === 0) return null;

  return (
    <Swiper
      className={`mt-3 h-[300px] flex justify-center ${className}`}
      circular
      autoplay
      previousMargin="36px"
      nextMargin="32px"
      onChange={onChange}
    >
      {
        list.map((item, index) => (
          <SwiperItem key={index} className="!w-[610px] !h-[300px] flex justify-center rounded-[28px]">
            <Image
              className="w-[610px] h-full rounded-[28px] transition-all"
              style={{ transform: `scale(${state.current === index ? 1 : 0.88})` }}
              src={item.imageUrl}
            />
          </SwiperItem>
        ))
      }
    </Swiper>
  );
}

type Props = {
  list: Res.Banner[]
  className?: string
}
