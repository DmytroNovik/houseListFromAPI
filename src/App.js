import React, {Component, Fragment} from 'react';
import './App.css';
import Paper from '@material-ui/core/Paper';
import {makeGetRequest} from './services'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class App extends Component {
  state = {
    templates: [],
    houses: [],
    activeTemplate: "",
  };

  componentDidMount() {
    makeGetRequest("http://demo4452328.mockable.io/properties").then(res => this.setState({houses: res.data.data}));
    makeGetRequest("http://demo4452328.mockable.io/templates").then(res => this.setState({templates: res.data, activeTemplate: res.data[0]}))
  }

  handleChange = (activeTemplate) => {
    const {templates} = this.state;
    this.setState({activeTemplate: templates.find(template => template.id === activeTemplate)})
  };

  render () {
    const {houses, templates, activeTemplate} = this.state;

    return (
        <div>
          <div className='templates-select'>
            <h3>Choose template: </h3>
            <Select
                value={activeTemplate !== "" ? activeTemplate.id : 1}
                onChange={e => this.handleChange(e.target.value)}
            >
              {templates.map(item => {
                return (
                    <MenuItem key={item.id} value={item.id}>{item.id}</MenuItem>
                )
              })}
            </Select>
          </div>
          <div className="houses">
            {houses.map(house => {
              return (
                  <Paper key={house.id} className='house'>
                    {activeTemplate && activeTemplate.template.map(template => (
                    <Fragment>
                      {template.field === 'images' && <img src={house.images[0]} alt=''/>}
                      {template.field === 'full_address' && <p>Address: {house.full_address}</p>}
                      {(template.field === 'price' || template.children) && <p>Price: {house.price}</p>}
                      {template.field === 'area' && house.area && <p>Area: {house.area}</p>}
                    </Fragment>
                    ))}
                  </Paper>
              )
              })
            }
          </div>
        </div>
    );
  }
}

export default App;
