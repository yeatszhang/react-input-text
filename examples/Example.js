import InputText from '../src/';
import React from 'react';

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '1'
    };
  }

  render() {
    return (
      <div>
        <p>{this.state.value}</p>
        <InputText
          value={this.state.value}
          onEnter={this.handleEnter.bind(this)}
          onChange={this.handleChange.bind(this)}
          placeholder="placeholder"/>
      </div>
    );
  }

  handleEnter(value) {
    this.setState({ value });
    console.log('enter');
  }

  handleChange(value) {
    this.setState({ value });
    console.log(value);
  }
}