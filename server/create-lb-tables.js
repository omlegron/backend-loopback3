'use strict';

var server = require('./server');
var fs = require('fs');
var ds = server.dataSources.db;
var lbTables = [];
var config = require('./model-config.json');
var transformedData = Object.entries(config).map(([key, value]) => {
  if (key !== '_meta') {
    lbTables.push(key);
  }
});
ds.automigrate(lbTables, function(er) {
  if (er) throw er;

  console.log('tables [' + lbTables + '] created in ', ds.adapter.name);

  ds.disconnect();
});
