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
                <Picture name={picture.name} localpath={picture.local_path} key={picture.id}>
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
        return (
            <div className="picture">
                <h3 className="pictureName">
                    {this.props.name}
                    <img src={this.props.localpath} className="img-responsive" />
                </h3>
            </div>
        );
    }
});

ReactDOM.render(
    <PictureBox url="/api/pictures" />,
    document.getElementById('content')
);