var restify = require('restify');
var jobsData = require('./job-search.json');

function getJobDetails(req, res, next) {
  res.json(jobsData);
  next();
}

var server = restify.createServer();
server.get('/api/jobs', getJobDetails);
server.head('/api/jobs', getJobDetails);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});