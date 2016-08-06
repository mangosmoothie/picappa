var PictureDisplay = React.createClass({
    getInitialState: function(){
        var startAt = 1;
        var perPage = 3;
        if(window.location.search.indexOf("startAt") > 0 && window.location.search.indexOf("perPage") > 0){
            var params = window.location.search.substring(1).split("&").map(function(e){return e.split("=");});
            for(var i = 0; i < params.length; i++){
                if(params[i][0] == "startAt"){
                    startAt = Number(params[i][1]);
                }else if (params[i][0] == "perPage"){
                    perPage = Number(params[i][1]);
                }
            }
        }
        return {
            columns: 4,
            columnWidth: "25%",
            editMode: false,
            editBtnClass: "col-xs-2 btn btn-default",
            editBtnsStyle: {display: "none"},
            selectActionClass: "form-control",
            perPage: perPage,
            startAt: startAt,
            tags: [],
            selectedTags: []
        };
    },
    // drawTags: function(tagDivId, tags){
    //     var tagElems = tags.map(function (tag) {
    //         var tn = tag.name;
    //         return '<div class="tag btn btn-success" onclick={this.moveTag(tag.name)}>'+tag.name+"</div>";
    //     });
    //     $(tagDivId).html(tagElems);
    // },
    loadAllTags: function(){
        $.ajax({
            url: "/api/all-tags",
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({tags: data['tags']});
                // this.drawTags('#allTags', data['tags']);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error("/api/all-tags", status, err.toString());
            }.bind(this)
        });
    },
    moveTag: function(tag){
        var allTags = [];
        var selectedTags = this.state.selectedTags;
        for(var i = 0; i < this.state.tags.length; i++){
            if(this.state.tags[i].id == tag.id){
                selectedTags.push(this.state.tags[i]);
            }else{
                allTags.push(this.state.tags[i]);
            }
        }
        this.setState({tags: allTags, selectedTags: selectedTags});
    },
    moveSelectedTag: function(tag){
        var allTags = this.state.tags;
        var selectedTags = [];
        for(var i = 0; i < this.state.selectedTags.length; i++){
            if(this.state.selectedTags[i].id == tag.id){
                allTags.push(this.state.selectedTags[i]);
            }else{
                selectedTags.push(this.state.selectedTags[i]);
            }
        }
        this.setState({tags: allTags, selectedTags: selectedTags});
    },
    componentDidMount: function() {
        this.loadAllTags();
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
    nextPage: function(){
        var startAt = this.state.startAt + this.state.perPage;
        history.pushState(null, "pics", "?startAt="+startAt+"&perPage="+this.state.perPage);
        this.setState({startAt: startAt});
    },
    prevPage: function(){
        var startAt = this.state.startAt - this.state.perPage;
        if(startAt < 1){
            startAt = 1;
        }
        history.pushState(null, "pics", "?startAt="+startAt+"&perPage="+this.state.perPage);
        this.setState({startAt: startAt});
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
                    <div className="col-xs-8" >
                        <input type="range" min="1" max="10" 
                         value={this.state.columns} onChange={this.onColumnsChanged} 
                         ref="column" style={{width: "50%"}}/>
                    </div>
                    <div className="col-xs-2">
                        <div className="dropdown">
                            <select className={this.state.selectActionClass} >
                                <option>Select</option>
                                <option value="tag">Add Tags</option>
                                <option value="del">Delete</option>
                            </select>
                        </div>
                    </div>
                    <div className={this.state.editBtnClass} style={styles.editBtn} 
                     onClick={this.handleEditClick} >
                        Edit
                    </div>
                </div>
                <fieldset>
                    <legend>All Tags</legend>
                    <TagPicker intags={this.state.tags} handleMoveTag={this.moveTag} />
                </fieldset>
                <fieldset>
                    <legend>Selected Tags</legend>
                    <TagPicker intags={this.state.selectedTags} handleMoveTag={this.moveSelectedTag} />
                </fieldset>
                <div className="row">
                    <hr/>
                    <br/>
                </div>
                <PictureBox url={this.props.url} columnWidth={this.state.columnWidth} prevPage={this.prevPage}
                 editMode={this.state.editMode} editBtnsStyle={this.state.editBtnsStyle} nextPage={this.nextPage}
                 tags={this.state.tags} startAt={this.state.startAt} perPage={this.state.perPage} />
            </div>
        );
    }
});

var Tag = React.createClass({
    getInitialState: function(){
        return {};
    },
    render: function(){
        return <div className="tag btn btn-success" onClick={this.props.onClick}>{this.props.name}</div>
    }
});

var TagPicker = React.createClass({
    handleTagClick: function(tag){
        this.props.handleMoveTag(tag);
    },
    render: function(){
        return (
            <div className="row">
                {this.props.intags.map(function(tag){
                    var handler = this.handleTagClick.bind(this, tag);
                    return (
                        <Tag key={tag.id} onClick={handler} name={tag.name}/>
                    );
                }, this)}
            </div>
        );
    }
});

var PictureBox = React.createClass({
    loadPicturesFromServer: function(startAt) {
        $.ajax({
            url: this.buildUrl(startAt),
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
    buildUrl: function(startAt) {
        var tgs = this.props.tags.map(function(e){return e.id;}).join(",");
        return this.props.url + "?startAt=" + startAt + "&perPage=" + this.props.perPage + "&tags=" + tgs;
    },
    handleNextClick: function(){
        var startAt = this.props.startAt + this.props.perPage;
        this.props.nextPage();
        this.loadPicturesFromServer(startAt);
    },
    handlePrevClick: function(){
        var startAt = this.props.startAt - this.props.perPage;
        if(startAt < 1){
            startAt = 1;
        }
        this.props.prevPage();
        this.loadPicturesFromServer(startAt);
    },
    getInitialState: function() {
        return {
            data: {"pictures":[]}
        };
    },
    componentDidMount: function() {
        this.loadPicturesFromServer(this.props.startAt);
    },
    render: function() {
        return (
            <div className="pictureBox">
                <div className="row">
                    <div className="col-xs-8">
                    </div>
                    <div className="col-xs-2 btn btn-default btn-margin" onClick={this.handlePrevClick} style={{width:"14%"}} >
                        Previous
                    </div>
                    <div className="col-xs-2 btn btn-default btn-margin" onClick={this.handleNextClick} style={{width:"14%"}} >
                        Next
                    </div>
                </div>
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
