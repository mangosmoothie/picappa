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
        return {data: {"pictures":[]}};
    },
    componentDidMount: function() {
        this.loadPicturesFromServer();
    },
    render: function() {
        return (
            <div className="pictureBox">
                <h1>Pictures</h1>
                <PictureList data={this.state.data} />
            </div>
        );
    }
});

var PictureList = React.createClass({
    render: function() {
        var pictureNodes = this.props.data.pictures.map(function (picture) {
            return (
                <Picture name={picture.name} picurl={picture.url} key={picture.id} width="25%">
                    //put the pic and stuff here
                </Picture>
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
                <a href={this.props.picurl}>
                    <img src={this.props.picurl} className="img-responsive"  />
                </a>
            </div>
        );
    }
});

ReactDOM.render(
    <PictureBox url="/api/pictures" />,
    document.getElementById('content')
);