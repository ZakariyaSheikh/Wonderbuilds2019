import React, { Component } from 'react';
import InputRange from 'react-input-range';
import './style.css';


class RangeFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      value: {
        min: 0,
        max: 0,
      },
    };
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      value: {
        min: this.props.currentFilters.min,
        max: this.props.currentFilters.max,
      },
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.currentFilters.disabled) {
      this.setState({
        ...this.state,
        value: {
          min: this.props.currentFilters.min,
          max: this.props.currentFilters.max,
        },
      });
    }
  }


  handleClick() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const {
      info, title, currentFilters, setPrice,
    } = this.props;
    const { isOpen, value } = this.state;

    return (
      <div>
        <div className={`${isOpen ? 'div_bolder' : ''} main_div`} onClick={() => this.handleClick()}>
          <div className="main_title">{title}</div>
          {isOpen ? <div className="angle_filter angle_filter_up" />
            : <div className="angle_filter angle_filter_down" />}
        </div>
        <div className={`${isOpen ? '' : 'hidden'} filter_range`}>
          {currentFilters
          && (
            <InputRange
              draggableTrack
              step={1}
              formatLabel={value => `£ ${value}`}
              maxValue={info[1]}
              minValue={0}
              value={{ min: value.min, max: value.max }}
              onChange={value => (this.setState({ ...this.state, value }))}
              onChangeComplete={value => setPrice(value)}
            />
          )}
        </div>
      </div>
    );
  }
}

export default RangeFilter;
