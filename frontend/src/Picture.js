import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

export default React.createClass({
  getInitialState: function () {
    return {
      selected: false,
      selectedClass: "img-responsive pic"
    };
  },
  handleClick: function (pic_id) {
    if (this.props.editMode) {
      if (this.state.selected) {
        this.props.deselectPic(pic_id);
        this.setState({selected: false, selectedClass: "img-responsive pic"});
      } else {
        this.props.selectPic(pic_id);
        this.setState({selected: true, selectedClass: "img-responsive pic selectedItem"});
      }
    } else {
      window.location = this.props.picurl;
    }
  },
  render: function () {
    var styles = {
      container: {
        width: this.props.width
      }
    };
    var handler = this.handleClick.bind(this, this.props.key);
    return (
        <div className="picContainer" style={styles.container}>
        <a href="javascript:void(0);" onClick={ handler }>
        <img src={this.props.thumburl} className={this.state.selectedClass}/>
        </a>
        <a href={this.props.editurl} className="btn btn-primary btn-xs small-edit-button"
      style={this.props.editBtnsStyle}>Edit</a>
        </div>
    );
  }
});
