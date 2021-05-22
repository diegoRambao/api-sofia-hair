"use strict";

var _express = _interopRequireWildcard(require("express"));

var _uid = require("uid");

var _path = _interopRequireWildcard(require("path"));

var _lowdb = require("lowdb");

var _url = require("url");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const app = (0, _express.default)();

const _filename = (0, _url.fileURLToPath)(import.meta.url);

const _dirname = _path.default.dirname(_filename);

const file = (0, _path.join)(_dirname, 'db.json');
const adapter = new _lowdb.JSONFile(file);
const db = new _lowdb.Low(adapter);
db.read();
db.data = db.data || {
  products: []
};
app.use((0, _express.json)());
app.get('/product', async (req, res) => {
  await db.read();
  const {
    products
  } = db.data;
  res.send(products);
});
app.post('/product', async (req, res) => {
  const product = {
    id: (0, _uid.uid)(16),
    ...req.body
  };
  db.data.products.push(product);
  await db.write();
  res.send(product);
});
app.put('/product/:id', async (req, res) => {
  await db.read();
  const {
    id
  } = req.params;
  const {
    products
  } = db.data;
  const newProducts = products.map(product => product.id === id ? { ...req.body,
    id
  } : product);
  db.data.products = newProducts;
  await db.write();
  res.json({
    message: 'Success'
  });
});
app.delete('/product/:id', async (req, res) => {
  await db.read();
  const {
    id
  } = req.params;
  const {
    products
  } = db.data;
  const filteredProducts = products.filter(product => product.id !== id);
  db.data.products = filteredProducts;
  await db.write();
  res.json({
    message: 'Success'
  });
});
app.listen('3000', () => {
  console.log('Server on port 3000');
});