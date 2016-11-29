# react-input-text

## feature

 * 默认debounce onChange 事件，避免频繁 rerender
 * 回车触发 onEnter
 
## props

|props   |type   |描述   |默认值   |
|---|---|---|---|---|
|value   |string   |input的值   |   |
|onChange   |function   |value变化后的回调   |noop   |
|onEnter   |function   |回车触发事件   |noop   |
|delay   |number   |debounce的时间   |300   |

* 除了以上的`props`都会向下传递给 `input`
* 按下回车后在触发onEnter(value)之前会先触发onChange(value)

## Example

```js
class Example extends React.Component {
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
```

## License

react-input-text is released under the MIT license.
