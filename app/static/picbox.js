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
        console.log('columns: ' + this.state.columns);
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
            return (
                <Picture name={picture.name} thumburl={picture.thumb_url} picurl={picture.url} key={picture.id} width={columnWidth} />
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
    render: function() {
        var styles = {
            picContainer: {
                display: "inline-block",
                width: this.props.width,
                padding: "5px"
            },
            pic: {
                width: "100%"
            }
        };
        return (
            <div className="picContainer" style={styles.picContainer}>
                {this.props.name}
                <a href={this.props.picurl} >
                    <img src={this.props.thumburl} className="img-responsive"  />
                </a>
            </div>
        );
    }
});

ReactDOM.render(
    <PictureDisplay url="/api/pictures" />,
    document.getElementById('content')
);