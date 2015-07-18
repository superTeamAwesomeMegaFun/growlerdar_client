var React = require('react');
var request = require('superagent');

var DataTableSearchBar = exports.DataTableSearchBar = React.createClass({
  handleChange: function() {
    this.props.onUserInput(
      this.refs.filterTextInput.getDOMNode().value
    );
  },

  render: function() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          ref="filterTextInput"
          onChange={this.handleChange}
        />
      </form>
    );
  }
});

var DataTableMetaList = module.exports = exports = React.createClass({
  render: function() {
    return (
      <ul className="list-meta">
        <li>Edit</li>
        <li>/</li>
        <li><a href="#" className="linkdeletelocation" rel={this.props.location._id}>Delete</a></li>
      </ul>
    );
  }
});

var DataTableAddEntry = exports.DataTableAddEntry = React.createClass({
  render: function() {
    return (
    	<div id="addLocation">
    		<fieldset>
	      	<label htmlFor="inputLocationName">Location Name</label>
	      	<input id="inputLocationName" type="text" required />

	      	<label htmlFor="inputLocationStreetAddress">Street Address</label>
	      	<input id="inputLocationStreetAddress" type="text" />

	      	<label htmlFor="inputLocationCity">City</label>
	      	<input id="inputLocationCity" type="text" />

	      	<label htmlFor="inputLocationState">State</label>
	      	<input id="inputLocationState" type="text" />

	      	<label htmlFor="inputLocationPostal">Zip Code</label>
	      	<input id="inputLocationPostal" type="text" />

	      	<label htmlFor="inputLocationUrl">Website</label>
	      	<input id="inputLocationUrl" type="url" />

	      	<label htmlFor="inputLocationPhone">Phone Number</label>
	      	<input id="inputLocationPhone" type="tel" />

	      	<button id="btnAddLocation">Add Location</button>
	      </fieldset>
    	</div>
    );
  }
});

var DataTableLocationRow = module.exports = exports = React.createClass({
  render: function() {
    return (
      <tr>
        <td>{this.props.location.name}</td>
        <td>{this.props.location.address.streetAddress}</td>
        <td>{this.props.location.address.city}</td>
        <td>{this.props.location.address.state}</td>
        <td>{this.props.location.address.postal}</td>
        <td>{this.props.location.address.website}</td>
        <td>{this.props.location.address.phone}</td>
        <td><DataTableMetaList location={this.props.location} /></td>
      </tr>
    );
  }
});

var DataTableLocationTable = exports.DataTableLocationTable = React.createClass({ 
  render: function() {
    var filterText = this.props.filterText;
    var locationNodes = this.props.locations.map(function(location) {

      if (location.name.indexOf(filterText) !== -1) {
        return (
          <DataTableLocationRow location={location} key={location.locationName} />
        );
      }
    });
return (
      <table className="table-full-width" id={this.props.tableType}>
        <thead>
          <tr>
            <th>Location Name</th>
            <th>Street Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
            <th>Website</th>
            <th>Phone Number</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{locationNodes}</tbody>
      </table>
    );
  }
});

var FilterableDataTable =  exports.FilterableDataTable = React.createClass({
  loadLocations: function() {
  	request
	  .get('http://localhost:4000/api/locations')
	  .end(function(err, res){
	  	if (err === null) {
	  		this.setState({data: res.body})
	  	}
	  }.bind(this));
  },

  getInitialState: function() {
    return {
      filterText: '',
      inStockOnly: false,
      data: []
    };
  },

  componentDidMount: function() {
    this.loadLocations();
    setInterval(this.loadLocations, 2000);
  },

  handleUserInput: function(filterText, inStockOnly) {
    this.setState({
      filterText: filterText,
      inStockOnly: inStockOnly
    });
  },

  render: function() {
    return (
      <div>
        <DataTableSearchBar
          filterText={this.state.filterText}
          onUserInput={this.handleUserInput}
        />
        <DataTableLocationTable
          locations={this.state.data}
          filterText={this.state.filterText}
          tableType="locationTable"
        />
        <DataTableAddEntry />
      </div>
    );
  }
});
