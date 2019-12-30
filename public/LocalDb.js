var _dbname, _version, _stores;

function _getdb() {
  return new Promise(function (resolve, reject) {
    var request = window.indexedDB.open(_dbname, _version);
    request.onerror = function () {
      console.log('ERROR', request);
      reject(request);
    };
    request.onsuccess = function () {
      resolve(request.result);
    };
    request.onupgradeneeded = function (event) {
      _upgradedb(event.target.result);
    };
  });
}

function _upgradedb(db) {
  _stores.forEach(function (store) {
    try {
      db.createObjectStore(store, { keyPath: 'id' });
    } catch (err) { }
  });
}

export function init(dbname, version, stores) {
  _dbname = dbname;
  _version = version;
  _stores = stores;
};

export function list(collectionname, userid) {
  return _getdb().then(function (db) {
    return new Promise(function (resolve) {
      var request = db.transaction([collectionname], 'readwrite').objectStore(collectionname).openCursor();
      var elements = [];
      request.onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
          if (cursor.value.user === userid) {
            elements.push(cursor.value);
          }
          cursor.continue();
        } else {
          resolve(elements);
        }
      };
    });
  });
};

export function load(collectionname, id) {
  return _getdb().then(function (db) {
    return new Promise(function (resolve) {
      var request = db.transaction([collectionname], 'readwrite').objectStore(collectionname).get(id);
      request.onsuccess = function (event) {
        resolve(event.target.result);
      };
    });
  });
};

export function save(collectionname, element) {
  return _getdb().then(function (db) {
    return new Promise(function (resolve, reject) {
      const request = db.transaction([collectionname], 'readwrite').objectStore(collectionname).put(element);
      request.onerror = function () {
        reject(request);
      };
      request.onsuccess = function () {
        resolve(request.result);
      };
    });
  });
};
