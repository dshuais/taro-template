import { useDebounceFn, useSetState } from 'ahooks';
import { ScrollView as ScrollViewDefault } from '@tarojs/components';

import './index.scss';

export default function ScrollView(props: Props) {

  const { top, refresherThreshold, refresherStyle, background, children, featchData } = props;

  const [state, setState] = useSetState({
    loading: false
  });

  const { run: onScrollToLower } = useDebounceFn(scrollToLower, { wait: 200, leading: true, trailing: false });
  const { run: onRefresherRefresh } = useDebounceFn(refresherRefresh, { wait: 200, leading: true, trailing: false });

  function refresherRefresh() {
    setState({ loading: true });
    featchData && featchData('reset');
    setTimeout(() => {
      setState({ loading: false });
    }, 2000);
  }

  function scrollToLower() {
    featchData && featchData('next');
  }

  return (
    <ScrollViewDefault
      className="ScrollView-8090psd"
      scrollY
      scrollWithAnimation
      enableBackToTop
      scrollAnchoring
      refresherEnabled
      refresherTriggered={state.loading}
      upperThreshold={top}
      refresherThreshold={refresherThreshold}
      refresherDefaultStyle={refresherStyle}
      refresherBackground={background}
      onRefresherRefresh={onRefresherRefresh}
      onScrollToLower={onScrollToLower}
    >
      {children}

    </ScrollViewDefault>
  );
}

type Props = {
  // TODO: Add props
  children?: React.ReactNode
  /** 距顶部/左边多远时（单位px），触发 scrolltoupper 事件 */
  top?: number
  refresherThreshold?: number
  refresherStyle?: 'black' | 'white' | 'none'
  background?: string
  featchData?: (type: string) => void
}
