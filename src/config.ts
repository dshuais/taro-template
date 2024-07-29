'use strict';

const ENV_ENUM = {
  'TEST': 'TEST',
  'UAT': 'UAT',
  'PROD': 'PROD'
};

const goEasyChannel = {
  'TEST': {
  },
  'UAT': {
  },
  'PROD': {
  }
};

const ENV = ENV_ENUM.TEST; // TEST OR PROD 发相应环境的时候修改此处的环境标志-重新打包即可

const baseConfig = {
  ENV,
  homePage: 'pages/index/index',
  channelInfo: goEasyChannel[ENV]
};
const config = {
  TEST: {
    requestUrl: '',
    appId: ''
  },
  UAT: {
    requestUrl: '',
    appId: ''
  },
  PROD: {
    requestUrl: '',
    appId: ''
  }
};

export default Object.assign({}, baseConfig, config[ENV], config);
