const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('browsery', {
  version: '1.0.0',
});
