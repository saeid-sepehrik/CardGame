const express = require('express');
const app = express();
var cors = require('cors')
app.use(cors())
const router = require('./src/routes');

require('./startup/config')(app, express);
require('./startup/db')();
require('./startup/logging')();

app.use('/api', router);

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`listen server ${port}`) })
