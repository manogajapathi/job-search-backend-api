const port = process.env.PORT || 3000;
const corsMiddleware = require('restify-cors-middleware')
var restify = require('restify');
var jobsData = require('./job-search.json');

// CORS for Access-Control
const cors = corsMiddleware({
  preflightMaxAge: 5, 
  origins: ['*'], 
  allowHeaders: ['API-Token'],
  exposeHeaders: ['API-Token-Expiry']
})

// Creating sever and setting the routes
var server = restify.createServer();
server.pre(cors.preflight)
server.use(cors.actual)
server.get('/', getIndex);
server.get('/api/jobs/list', getAllJobDetails);
server.get('/api/jobs/:id', getJobDetails);

// Server deploy message on home page
function getIndex(req, res, next) {
  res.send("Backend server is running successfully by Manogajapathi");
  next();
}

// Display list of job details
function getAllJobDetails(req, res, next) {
  res.json(jobsData);
  next();
}

// Display a particular job details using jobID
function getJobDetails(req, res, next) {
  let id = req.params.id;
  var selectedJob = jobsData.filter(function(i) {
    return i.jobID == id;
  }); 
  res.json(selectedJob);
  next();
}

server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url);
});