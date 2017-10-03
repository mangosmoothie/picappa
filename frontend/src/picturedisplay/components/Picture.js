import React from 'react';

export default React.createClass({
  getInitialState: function () {
    return {
      selected: false,
      selectedClass: "img-responsive pic",
      selectedItem: {
        width: '100%',
        align: 'center',
        borderWidth: 'thick',
        borderStyle: 'solid',
        borderColor: '#00ff00'
      },
      style: {
        width: '100%',
        align: 'center',
      }
    };
  },
  handleClick: function (pic_id) {
    if (this.props.editMode) {
      if (this.state.selected) {
        this.props.deselectPic(pic_id);
        this.setState({selected: false, style: {}});
      } else {
        this.props.selectPic(pic_id);
        this.setState({selected: true, style: this.state.selectedItem});
      }
    } else {
      window.location = this.props.picurl;
    }
  },
  render: function () {
    var smallButtonStyle =
        Object.assign({}, {margin: '2.5px 0px 0px 0px'}, this.props.editBtnsStyle);
    var styles = {
      container: {
        display: 'inline-block',
        paddingLeft: '5px',
        paddingRight: '5px',
        paddingTop: '2.5px',
        paddingBottom: '2.5px',
        width: this.props.width
      },
      smallEditButton: smallButtonStyle
    };
    var handler = this.handleClick.bind(this, this.props.id);
    return (
        <div style={styles.container}>
        <a href="javascript:void(0);" onClick={ handler }>
          <img src={this.props.thumburl} style={this.state.style}
            className={this.state.selectedClass}/>
        </a>
        <a href={this.props.editurl} className="btn btn-primary btn-xs small-edit-button"
          style={styles.smallEditButton}>Edit</a>
        </div>
    );
  }
});
