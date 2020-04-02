import * as path from 'path';

export default appInfo => {
  const config: any = {};

  config.cluster = {
    listen: {
      port: 8010,
    },
  };

  config.middleware = ['staticCacheIgnore', 'bodyclothes'];
  config.keys = appInfo.name + '_pipeline';

  config.static = {
    enable: true,
    ignore: ctx => [/public\/pipelines\/\d+\/server\/dist\/index\.html/].some(item => item.test(ctx.path)),
  };

  config.staticCacheIgnore = {
    dontCache: [/public\/pipelines\/\d+\/server\/dist\/index\.html/],
  };

  config.security = {
    csrf: {
      enable: false,
    },
    // 编辑中的的页面在 iframe 中浏览, 所以需要允许
    xframe: {
      enable: false,
    },
  };

  exports.logger = {
    dir: path.join(__dirname, '..', 'logs'),
  };

  config.cors = {
    origin: ctx => ctx.get('origin'),
    credentials: true,
  };

  // mongodb 连接
  const modeConfig = {
    mongo: {
      user: 'mongouser',
      password: encodeURIComponent('password'),
      host: 'localhost',
      port: '27017',
      DB: 'pipeline',
      authSource: 'admin',
    },
  };
  config.mongoose = {
    url: `mongodb://${modeConfig.mongo.user}:${modeConfig.mongo.password}@${modeConfig.mongo.host}:${modeConfig.mongo.port}/${modeConfig.mongo.DB}?authSource=${modeConfig.mongo.authSource}`,
    options: {
      poolSize: 16,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 500,
      bufferMaxEntries: 0,
    },
  };

  return config;
};
