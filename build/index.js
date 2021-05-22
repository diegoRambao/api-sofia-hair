"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)(); // const adapter = low.JSONFile(file)
// console.log(file)

app.get('/', (req, res) => {
  res.send('Hello world');
});
app.listen('3000', () => {
  console.log('Server on port 3000');
});