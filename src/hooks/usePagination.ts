import { useEffect, useMemo } from 'react';
import { useLatest, useSetState } from 'ahooks';
import { useReachBottom } from '@tarojs/taro';

export default function usePagination<T>(props?: Props) {

  const { pageSize = 5 } = props || {};

  type State = {
    status: string
    list: T[]
    total: number
    pageNum: number
    pageSize: number
    /** 用于强制更新 */
    timestamp: number
  }

  const [state, setState] = useSetState<State>({
    status: STATUS.DEFAULT,
    list: [],
    total: 0,
    pageNum: 1,
    pageSize,
    timestamp: Date.now()
  });
  const paramsRef = useLatest(state);

  useReachBottom(() => {
    const { status, list, total, pageNum } = state;
    if(status === STATUS.DEFAULT && list.length < total) {
      setState({
        pageNum: pageNum + 1,
        status: STATUS.LOADING
      });
    }
  });

  useEffect(() => {
    setState({
      status: state.list.length >= state.total ? STATUS.FINISH : STATUS.DEFAULT
    });
  }, [state.list, state.total]);

  type Update = Pick<typeof state, keyof typeof state>

  function setPagination(data: { [P in keyof typeof state]?: any }) {
    setState(data as Update);
  }

  const getStatusText = useMemo(() => {
    return state.status === STATUS.FINISH ? '没有更多了~' : state.status === STATUS.LOADING ? '加载中...' : '下滑加载更多';
  }, [state.status]);

  return {
    pagination: {
      ...state,
      ...paramsRef.current,
      statusText: getStatusText
    },
    fetchStatus: state.status,
    setPagination
  };
}

type Props = {
  pageSize?: number
}

export const STATUS = {
  LOADING: 'loading',
  FINISH: 'finish',
  DEFAULT: 'default'
};

