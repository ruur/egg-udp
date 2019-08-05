'use strict';

const assert = require('assert');
const path = require('path');
const pluginName = 'udp';

function resolveController(controller, app) {
  if (typeof controller === 'string') {
    const actions = controller.split('.');
    let obj = app[pluginName].controller;
    actions.forEach(key => {
      obj = obj[key];
      if (!obj) throw new Error(`controller '${controller}' not exists`);
    });
    controller = obj;
  }
  // ensure controller is exists
  if (!controller) throw new Error('controller not exists');
  return controller;
}

function EggUdp(app) {
  this.app = app;
  const udpPort = app.config.udp.port;
  assert(udpPort, 'udp port is not exists');

  const dgram = require('dgram');
  const udp = dgram.createSocket('udp4');
  udp.bind(udpPort);
  this.udp = udp;
}

EggUdp.prototype.handle = function(handler) {
  const controller = resolveController(handler, this.app);
  controller(this.udp);
};

module.exports = app => {
  const udp = new EggUdp(app);
  app[pluginName] = udp;
  app[pluginName].controller = app[pluginName].controller || {};

  new app.loader.FileLoader({
    directory: path.join(app.config.baseDir, 'app', pluginName, 'controller'),
    target: app[pluginName].controller,
    inject: app,
  }).load();
};
