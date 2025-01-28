'use strict';

hexo.extend.filter.register('after_render:html', require('./lib/img_lazyload').processSite);
hexo.extend.filter.register('after_render:html', require('./lib/img_onerror').processSite);
hexo.extend.injector.register(
  "body_begin",
  '<div id="lantern-wrapper" class="lantern-wrapper" no-select></div>',
  "default"
);
