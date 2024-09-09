/*
 * @Author: dushuai
 * @Date: 2024-08-26 20:28:37
 * @LastEditors: dushuai
 * @LastEditTime: 2024-08-28 23:34:12
 * @description: HeaderWarp
 */

import { useMemo, useState } from 'react';
import Taro, { useResize } from '@tarojs/taro';

import { getSystemInfo } from '@/utils/tools';
import { navigateTo } from '@/utils/navigateTo';
import { PAGE } from '@/constants/PAGE';
import HeaderFill from '../HeaderFill';

import './index.scss';

type Props = {
  children?: React.ReactNode
  background?: string
  color?: string
  title?: string
  showGoBack: boolean
  style: object
  /** 是否占位 默认有 */
  needFill: boolean
  /** 如果当前头部需要固定image展示 最好使用页面拼接img */
  image?: string
  isShowBack?: boolean
  onBack?: () => void
}

/**
 * 头部组件
 */
export default function HeaderWarp(props: Props) {

  const { children, background, color, title, showGoBack, style, needFill, image, isShowBack, onBack } = props;

  const [resizeKey, setResizeKey] = useState(0);

  useResize(() => {
    setResizeKey(Date.now());
  });

  const { statusBarHeight, navBarHeight, isIOS, headerHeight } = useMemo(() => {
    return getSystemInfo();
  }, [resizeKey]);

  const titleStyle = `${isIOS ? 'ios-title' : 'android-title'}`;

  const pages = Taro.getCurrentPages();

  // 判断如果不存在上级路由，则直接跳回首页
  function back() {
    if(onBack) return onBack();

    if(pages.length > 1) {
      Taro.navigateBack();
    } else {
      navigateTo({ path: PAGE.HOME, type: 'reLaunch' });
    }
  }

  const imageStyle = useMemo(() => {
    if(image) return {
      background: `url(${image})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100%'
    };

    return {};
  }, [image]);

  return (
    <div className="HeaderWrap-wrap">
      <div className="HeaderWrap" style={{ paddingTop: `${statusBarHeight}px`, background, color, ...imageStyle, ...style }}>

        {
          (title || isShowBack) &&
          <div className="title-wrap" style={{ height: `${navBarHeight}px` }}>
            {
              showGoBack ? <div className="go-back" onClick={back} /> : <div className="w-[51px]" />
            }

            <div className={`inner-content ${titleStyle}`}>
              <text className="HeaderWrap-max-text">{title}</text>
            </div>
          </div>
        }

        {
          !title &&
          <div className="head-wrap" style={{ height: `${navBarHeight}px` }}>
            {children}
          </div>
        }
      </div>

      {
        needFill && <div className="height-fill" style={{ height: `${headerHeight}px`, width: '100%' }} />
      }

      {
        image && <HeaderFill />
      }
    </div>
  );
}

HeaderWarp.defaultProps = {
  background: '',
  color: '#000',
  title: '',
  showGoBack: true,
  style: {},
  needFill: true,
  isShowBack: false
};
