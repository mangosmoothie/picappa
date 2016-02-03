var PictureDisplay = React.createClass({
    getInitialState: function(){
        return {
            columns: 4,
            columnWidth: "25%",
            editMode: false,
            editBtnClass: "col-xs-2 btn btn-default",
            editBtnsStyle: {display: "none"}
        };
    },
    handleEditClick: function(){
        if(this.state.editMode){
            this.setState({ editMode: false, editBtnClass: "col-xs-2 btn btn-default",
                          editBtnsStyle: {display: "none"}});
        }else{
            this.setState({ editMode: true, editBtnClass: "col-xs-2 btn btn-success",
                          editBtnsStyle: {}});
        }
    },
    onColumnsChanged: function() {
        this.setState({
            columnWidth: Math.floor(100 / parseInt(this.refs.column.value)) + "%",
            columns: this.refs.column.value
        })
    },
    render: function() {
        var styles = {
            editBtn: {
                width: "14%"
            }
        };
        return (
            <div className="pictureDisplay">
                <div className="row">
                    <div className="col-xs-10" >
                        <input type="range" min="1" max="10" 
                         value={this.state.columns} onChange={this.onColumnsChanged} 
                         ref="column" style={{width: "50%"}}/>
                    </div>
                    <div className={this.state.editBtnClass} style={styles.editBtn} 
                     onClick={this.handleEditClick} >
                        Edit
                    </div>
                </div>
                <PictureBox url={this.props.url} columnWidth={this.state.columnWidth}
                 editMode={this.state.editMode} editBtnsStyle={this.state.editBtnsStyle} />
            </div>
        );
    }
});

var PictureBox = React.createClass({
    loadPicturesFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {
            data: {"pictures":[]}
        };
    },
    componentDidMount: function() {
        this.loadPicturesFromServer();
    },
    render: function() {
        return (
            <div className="pictureBox">
                <h1>Pictures</h1>
                <PictureList columnWidth={this.props.columnWidth} data={this.state.data} 
                 editMode={this.props.editMode} editBtnsStyle={this.props.editBtnsStyle} />
            </div>
        );
    }
});

var PictureList = React.createClass({
    render: function() {
        var columnWidth = this.props.columnWidth;
        var editMode = this.props.editMode;
        var editBtnsStyle = this.props.editBtnsStyle;
        var pictureNodes = this.props.data.pictures.map(function (picture) {
            var editurl = "/mediaitem/" + picture.id;
            return (
                <Picture name={picture.name} thumburl={picture.thumb_url} picurl={picture.url} 
                 key={picture.id} width={columnWidth} editurl={editurl} 
                 editMode={editMode} editBtnsStyle={editBtnsStyle} />
            );
        });
        return (
            <div className="pictureList">
                {pictureNodes}
            </div>
        );
    }
});

var Picture = React.createClass({
  getInitialState: function() {
    return {
      selected: false,
      selectedClass: "img-responsive pic"
    };
  },
  handleClick: function() {
    if (this.props.editMode){
        if( this.state.selected){
            this.setState({ selected: false, selectedClass: "img-responsive pic" });
        } else {
            this.setState({ selected: true, selectedClass: "img-responsive pic selectedItem" });
        }
    }else{
        window.location = this.props.picurl;
    }
  },
  render: function() {
    var styles = {
      container: {
        width: this.props.width
      }
    };
    return (
        <div className="picContainer" style={styles.container}>
            <a href="javascript:void(0);" onClick={ this.handleClick } >
                <img src={this.props.thumburl} className={this.state.selectedClass} />
            </a>
            <a href={this.props.editurl} className="btn btn-primary btn-xs small-edit-button"
             style={this.props.editBtnsStyle}>Edit</a>
        </div>
    );
  }
});

ReactDOM.render(
    <PictureDisplay url="/api/pictures" />,
    document.getElementById('content')
);
