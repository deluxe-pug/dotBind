const app = require('./server-config.js')
const port = process.env.PORT || 8000;

var configPath = !!process.env.LOAD_SAMPLE ? '../../sample.config.env' : '../../config.env';

require('env2')(configPath); // import environment variables
// app.use(express.static(__dirname + '/../../../client/app', {
//   extensions: ['html']
// }));

app.listen(port, () => console.log('Listening on port ' + port));