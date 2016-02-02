var PictureDisplay = React.createClass({
    getInitialState: function(){
        return {
            columns: 4,
            columnWidth: "25%"
        };
    },
    onColumnsChanged: function() {
        this.setState({
            columnWidth: Math.floor(100 / parseInt(this.refs.column.value)) + "%",
            columns: this.refs.column.value
        })
    },
    render: function() {
        return (
            <div className="pictureDisplay">
                <input type="range" min="1" max="10" value={this.state.columns} onChange={this.onColumnsChanged} ref="column" style={{width: "25%"}}/>
                <PictureBox url={this.props.url} columnWidth={this.state.columnWidth} />
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
                <PictureList columnWidth={this.props.columnWidth} data={this.state.data} />
            </div>
        );
    }
});

var PictureList = React.createClass({
    render: function() {
        var columnWidth = this.props.columnWidth;
        var pictureNodes = this.props.data.pictures.map(function (picture) {
            var editurl = "/mediaitem/" + picture.id;
            return (
                <Picture name={picture.name} thumburl={picture.thumb_url} picurl={picture.url} key={picture.id} width={columnWidth} editurl={editurl}/>
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
    if( this.state.selected){
      this.setState({ selected: false, selectedClass: "img-responsive pic" });
    } else {
      this.setState({ selected: true, selectedClass: "img-responsive pic selectedItem" });
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
            <a href={this.props.editurl} className="btn btn-primary btn-xs small-edit-button" style={styles.button}>Edit</a>
        </div>
    );
  }
});

ReactDOM.render(
    <PictureDisplay url="/api/pictures" />,
    document.getElementById('content')
);
