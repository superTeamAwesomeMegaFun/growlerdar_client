var React = require('react');
var request = require('superagent');
var App = require('./components/app.jsx');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;

React.render(<App />, document.body);

document.addEventListener('DOMContentLoaded', function() { 
  document.getElementById('btnAddLocation').addEventListener('click', addLocation);
	document.getElementById('locationTable').addEventListener('click', function(e) {
		deleteLocation(e);
	});
});

function addLocation(event) {
  var errorCount = 0;
  var inputs = document.querySelectorAll('#addLocation input');
  for (var i = 0, len = inputs.length; i < len; i++) {
  	if(inputs[i].value === '') { errorCount++; }
  }

  if(errorCount === 0) {
    var newLocation = {
      name: document.getElementById('inputLocationName').value,
      address: {
      	streetAddress: document.getElementById('inputLocationStreetAddress').value,
		    city: document.getElementById('inputLocationCity').value,
		    postalCode: document.getElementById('inputLocationPostal').value,
		    state: document.getElementById('inputLocationState').value,
		    website: document.getElementById('inputLocationUrl').value,
		    phone: document.getElementById('inputLocationPhone').value
      },
      type: 'store'
    }

    request
		  .post('http://localhost:4000/api/locations')
		  .set('Content-Type', 'application/json')
		  .send(newLocation)
		  .end(function(err, res){
		  	if (err === null) {
		  		for (var i = 0, len = inputs.length; i < len; i++) {
		  			inputs[i].value = '';
		  		}
		  	}
		  });
  } else {
    alert('Please fill in all fields');

    return false;
  }

  event.preventDefault();
};

function deleteLocation(event) {
  var confirmation = confirm('Are you sure you want to delete this location?');

  if (confirmation === true) {
  	request
		  .del('http://localhost:4000/api/locations/' + event.target.getAttribute('rel'))
		  .end(function(err, res) {});
  } else {
    return false;
  }

  event.preventDefault();
};