var React = require('react');
var FilterableDataTable = require('./data-table.jsx').FilterableDataTable;

var App = module.exports = exports = React.createClass({
  render: function() {
    return (
    	<main>
    		<h1>Growlerdar app yo!</h1>
    		<FilterableDataTable data="/api/locations" />
    	</main>
   	);
  }
});
