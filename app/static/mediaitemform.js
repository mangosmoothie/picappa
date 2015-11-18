var MediaItemBox = React.createClass({
    loadMediaItem: function(mediaitem_id) {
        $.ajax({
            url: this.props.url + mediaitem_id,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({mediaitem: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    loadSelections: function() {
        $.ajax({
            url: '/api/mediaitem-selections',
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({statuses: data['statuses'], mediaTypes: data['media_types']});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleMediaItemUpdate: function(mediaitem){
        $.ajax({
            url: this.props.url + this.state.mediaitem.id,
            dataType: 'json',
            type: 'POST',
            data: mediaitem,
            success: function(data) {
                this.setState({
                    mediaitem: data
                });
                var alertBox = $('#alert');
                alertBox.attr('class', 'alert alert-success');
                alertBox.html('Update successful');
                alertBox.fadeTo(2000, 500).slideUp(500, function(){
                    alertBox.attr('class', 'invisible');
                });
            }.bind(this),
            error: function(xhr, status, err) {
                this.setState({
                    mediaitem: mediaitem
                });
                var alertBox = $('#alert');
                alertBox.attr('class', 'alert alert-danger');
                alertBox.html('Update failed');
                alertBox.fadeTo(2000, 500).slideUp(500, function(){
                    alertBox.attr('class', 'invisible');
                });
                console.error(this.props.url + mediaitem.id, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {mediaitem: {}, statuses: [], mediaTypes: []};
    },
    componentDidMount: function() {
        var currentUrl = window.location.href;
        var mediaitem_id = currentUrl.substr(currentUrl.lastIndexOf('/') + 1).split('?')[0];
        this.loadMediaItem(mediaitem_id);
        this.loadSelections();
    },
    render: function(){
        var thumburl = this.state.mediaitem.thumb_url ? "/" + this.state.mediaitem.thumb_url : null;
        return(
            <div className="mediaItemBox">
                <PictureBox thumburl={thumburl} />
                <div id="alert" className="hidden">
                </div>
                <MediaItemForm  mediaitem={this.state.mediaitem} statuses={this.state.statuses}
                                mediaTypes={this.state.mediaTypes} onMediaItemUpdate={this.handleMediaItemUpdate} />
            </div>
        );
    }
});

var MediaItemForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var name = this.refs.name.value.trim() || this.props.mediaitem.name;
        var desc = this.refs.desc.value.trim() || this.props.mediaitem.description;
        var media_type_cd = this.refs.media_type_cd.value.trim() || this.props.mediaitem.media_type_cd;
        var status_cd = this.refs.status_cd.value.trim() || this.props.mediaitem.status_cd;
        if (!name || !desc || !media_type_cd || !status_cd){
            return;
        }
        this.props.onMediaItemUpdate({id: this.props.mediaitem.id, name: name, description: desc, media_type_cd: media_type_cd, status_cd: status_cd});
    },
    render: function() {
        var currStatusCode = this.props.mediaitem.status_cd;
        var statusCdNodes = this.props.statuses.map(function(statusCode){
            if(statusCode['status_cd'] == currStatusCode) {
                return (
                    <option value={statusCode['status_cd']} selected="selected">{statusCode['name']}</option>
                );
            } else {
                return (
                    <option value={statusCode['status_cd']}>{statusCode['name']}</option>
                );
            }
        });
        var currMediaTypeCode = this.props.mediaitem.media_type_cd;
        var mediaTypeNodes = this.props.mediaTypes.map(function(mediaType){
            if(mediaType['media_type_cd'] == currMediaTypeCode){
                return (
                    <option value={mediaType['media_type_cd']} selected="selected">{mediaType['name']}</option>
                );
            } else {
                return (
                    <option value={mediaType['media_type_cd']}>{mediaType['name']}</option>
                );
            }
        });
        return (
            <div className="mediaitemUpdate">
                <form className="form-horizontal" role="form" onSubmit={this.handleSubmit} >
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="name">Name:</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="name" placeholder={this.props.mediaitem.name} ref="name" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="desc">Description:</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="desc" placeholder={this.props.mediaitem.description} ref="desc" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="original_filename">Original Filename:</label>
                        <div className="col-sm-10">
                            <p id="original_filename" className="form-control-static">{this.props.mediaitem.original_filename}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="origin_date">Origin Date:</label>
                        <div className="col-sm-10">
                            <p id="origin_date" className="form-control-static">{this.props.mediaitem.origin_date}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="added_date">Added Date:</label>
                        <div className="col-sm-10">
                            <p id="added_date" className="form-control-static">{this.props.mediaitem.added_date}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="modified_date">Modified Date:</label>
                        <div className="col-sm-10">
                            <p id="modified_date" className="form-control-static">{this.props.mediaitem.modified_date}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="status_cd">Status Code:</label>
                        <div className="col-sm-10">
                            <select className="form-control" ref="status_cd">
                                {statusCdNodes}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="media_type_cd">Media Type Code:</label>
                        <div className="col-sm-10">
                            <select className="form-control" ref="media_type_cd">
                                {mediaTypeNodes}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="file_size">File Size:</label>
                        <div className="col-sm-10">
                            <p id="file_size" className="form-control-static">{this.props.mediaitem.file_size}</p>
                        </div>
                    </div>
                    <input type="submit" className="btn btn-default" value="Submit" />
                </form>
            </div>
        );
    }
});

var PictureBox = React.createClass({
    render: function() {
        var styles = {
            pictureBox: {
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                padding: "5px"
            }
        };
        if(this.props.thumburl){
            return (
                <div className="">
                    <img src={this.props.thumburl} className="img-responsive" style={styles.pictureBox} />
                </div>
                );

        }else{
            return (
                <div className="">
                </div>
            );
        }
    }
});

ReactDOM.render(
    <MediaItemBox url='/api/mediaitem/' />,
    document.getElementById('content')

);

