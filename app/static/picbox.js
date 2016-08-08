var PictureDisplay = React.createClass({
    getInitialState: function () {
        var startAt = 0;
        var perPage = 3;
        if (window.location.search.indexOf("startAt") > 0 && window.location.search.indexOf("perPage") > 0) {
            var params = window.location.search.substring(1).split("&").map(function (e) {
                return e.split("=");
            });
            for (var i = 0; i < params.length; i++) {
                if (params[i][0] == "startAt") {
                    startAt = Number(params[i][1]);
                } else if (params[i][0] == "perPage") {
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
            actionBtnClass: "col-xs-2 btn btn-default",
            actionBtnLabel: "Filter",
            perPage: perPage,
            startAt: startAt,
            tags: [],
            selectedTags: [],
            filterTags: []
        };
    },
    loadAllTags: function () {
        $.ajax({
            url: "/api/all-tags",
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({tags: data['tags']});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error("/api/all-tags", status, err.toString());
            }.bind(this)
        });
    },
    moveTag: function (tag) {
        var allTags = [];
        var selectedTags = this.state.selectedTags;
        for (var i = 0; i < this.state.tags.length; i++) {
            if (this.state.tags[i].id == tag.id) {
                selectedTags.push(this.state.tags[i]);
            } else {
                allTags.push(this.state.tags[i]);
            }
        }
        this.setState({tags: allTags, selectedTags: selectedTags});
    },
    moveSelectedTag: function (tag) {
        var allTags = this.state.tags;
        var selectedTags = [];
        for (var i = 0; i < this.state.selectedTags.length; i++) {
            if (this.state.selectedTags[i].id == tag.id) {
                allTags.push(this.state.selectedTags[i]);
            } else {
                selectedTags.push(this.state.selectedTags[i]);
            }
        }
        this.setState({tags: allTags, selectedTags: selectedTags});
    },
    componentDidMount: function () {
        this.loadAllTags();
    },
    handleEditClick: function () {
        if (this.state.editMode) {
            this.setState({
                editMode: false, editBtnClass: "col-xs-2 btn btn-default",
                editBtnsStyle: {display: "none"}, actionBtnLabel: "Filter",
                actionBtnClass: "col-xs-2 btn btn-default"
            });
        } else {
            this.setState({
                editMode: true, editBtnClass: "col-xs-2 btn btn-success",
                editBtnsStyle: {}, actionBtnLabel: "Execute", actionBtnClass: "col-xs-2 btn btn-warning"
            });
        }
    },
    addFilterTags: function () {
        var filts = [];
        if (this.state.selectedTags.length > 0) {
            for (var i = 0; i < this.state.selectedTags.length; i++) {
                filts.push(this.state.selectedTags[i]);
            }
        }
        this.setState({filterTags: filts});
    },
    buildTagsParam: function () {
        if (this.state.filterTags.length > 0) {
            var tgs = this.state.filterTags.map(function (e) {
                return e.id;
            }).join(",");
            return "&tags=" + tgs;
        }
        return "";
    },
    nextPage: function () {
        var startAt = this.state.startAt + this.state.perPage;
        this.setState({startAt: startAt});
    },
    prevPage: function () {
        var startAt = this.state.startAt - this.state.perPage;
        if (startAt < 0) {
            startAt = 0;
        }
        this.setState({startAt: startAt});
    },
    onColumnsChanged: function () {
        this.setState({
            columnWidth: Math.floor(100 / parseInt(this.refs.column.value)) + "%",
            columns: this.refs.column.value
        })
    },
    render: function () {
        var styles = {
            editBtn: {
                width: "14%"
            }
        };
        return (
            <div className="pictureDisplay">
                <div className="row">
                    <div className="col-xs-8">
                        <input type="range" min="1" max="10"
                               value={this.state.columns} onChange={this.onColumnsChanged}
                               ref="column" style={{width: "50%"}}/>
                    </div>
                    <div className="col-xs-2">
                    </div>
                    <div className={this.state.editBtnClass} style={styles.editBtn}
                         onClick={this.handleEditClick}>
                        Edit
                    </div>
                </div>
                <fieldset style={{marginBottom: "1.0em"}}>
                    <legend>All Tags</legend>
                    <TagPicker intags={this.state.tags} handleMoveTag={this.moveTag}/>
                </fieldset>
                <fieldset style={{marginBottom: "1.0em"}}>
                    <legend>Selected Tags</legend>
                    <TagPicker intags={this.state.selectedTags} handleMoveTag={this.moveSelectedTag}/>
                </fieldset>
                <div className="row">
                    <hr/>
                    <br/>
                    <div id="alert" className="hidden">
                    </div>
                </div>
                <PictureBox url={this.props.url} columnWidth={this.state.columnWidth} prevPage={this.prevPage}
                            editMode={this.state.editMode} editBtnsStyle={this.state.editBtnsStyle}
                            nextPage={this.nextPage}
                            tags={this.state.filterTags} startAt={this.state.startAt} perPage={this.state.perPage}
                            addFilterTags={this.addFilterTags} selectedTags={this.state.selectedTags}
                            actionBtnLabel={this.state.actionBtnLabel} actionBtnClass={this.state.actionBtnClass}/>
            </div>
        );
    }
});

var Tag = React.createClass({
    getInitialState: function () {
        return {};
    },
    render: function () {
        return <div className="tag btn btn-success" onClick={this.props.onClick}>{this.props.name}</div>
    }
});

var TagPicker = React.createClass({
    handleTagClick: function (tag) {
        this.props.handleMoveTag(tag);
    },
    render: function () {
        return (
            <div>
                {this.props.intags.map(function (tag) {
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
    loadPicturesFromServer: function (startAt, filterTags) {
        var url = this.buildUrl(startAt, filterTags);
        $.ajax({
            url: url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({data: data});
                history.pushState(null, "pics", this.buildUrlParams(startAt, filterTags));
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    addSelectedTagsToMediaItems: function () {
        var resp = {
            picIds: this.state.selectedPics,
            tagIds: this.props.selectedTags.map(function (e) {
                return e.id;
            })
        };

        $.ajax({
            url: '/api/tag-all',
            type: 'POST',
            data: JSON.stringify(resp),
            contentType: 'application/json',
            success: function (data) {
                var msg = 'successfully submitted update.';
                this.popAlert(msg, 'SUCCESS');
            }.bind(this),
            error: function (xhr, status, err) {
                var msg = 'ajax request failed: ' + err;
                console.error(msg);
                this.popAlert(msg, 'ERROR');
            }.bind(this)
        });
    },
    popAlert: function (msg, status) {
        var ab = $('#alert');
        switch (status.toUpperCase()) {
            case 'ERROR':
                ab.attr('class', 'alert alert-danger');
                break;
            case 'SUCCESS':
                ab.attr('class', 'alert alert-success');
                break;
            case 'WARNING':
                ab.attr('class', 'alert alert-warning');
                break;
            default:
                ab.attr('class', 'alert alert-info');
        }
        ab.html(msg);
        ab.fadeTo(2000, 500).slideUp(500, function () {
            ab.attr('class', 'invisible');
        });
    },
    buildUrlParams: function (startAt, filterTags) {
        var tgs = "";
        if (filterTags) {
            tgs = filterTags.length > 0 ? "&tags=" + filterTags.map(function (e) {
                return e.id;
            }).join(",") : "";
        }
        return "?startAt=" + startAt + "&perPage=" + this.props.perPage + tgs;
    },
    buildUrl: function (startAt, filterTags) {
        return this.props.url + this.buildUrlParams(startAt, filterTags);
    },
    handleMultiClick: function () {
        if (this.props.editMode) {
            switch (this.state.selectedAction) {
                case "tag":
                    this.addSelectedTagsToMediaItems();
                    break;
                case "rep":

                    break;
                case "del":

                    break;
                default:
            }

        } else {
            this.props.addFilterTags();
            var filterTags = [];
            this.props.selectedTags.forEach(function (e) {
                filterTags.push(e)
            });
            this.loadPicturesFromServer(0, filterTags);
        }
    },
    handleNextClick: function () {
        var startAt = this.props.startAt + this.props.perPage;
        this.props.nextPage();
        this.loadPicturesFromServer(startAt, this.props.tags);
    },
    handlePrevClick: function () {
        var startAt = this.props.startAt - this.props.perPage;
        if (startAt < 0) {
            startAt = 0;
        }
        this.props.prevPage();
        this.loadPicturesFromServer(startAt, this.props.tags);
    },
    getInitialState: function () {
        return {
            data: {"pictures": []},
            selectedAction: "None",
            selectedPics: []
        };
    },
    selectPic: function (picId) {
        var pics = this.state.selectedPics;
        pics.push(picId);
        this.setState({selectedPics: pics});
    },
    deselectPic: function (picId) {
        var pics = [];
        for (var i = 0; i < this.state.selectedPics; i++) {
            if (this.state.selectedPics[i] != picId) {
                pics.push(this.state.selectedPics[i]);
            }
        }
        this.setState({selectedPics: pics});
    },
    componentDidMount: function () {
        this.loadPicturesFromServer(this.props.startAt, this.props.tags);
    },
    handleActionChange: function (e) {
        this.setState({selectedAction: e.target.value})
    },
    render: function () {
        return (
            <div className="pictureBox">
                <div className="row">
                    <div className={this.props.actionBtnClass} onClick={this.handleMultiClick} style={{width: "14%"}}>
                        {this.props.actionBtnLabel}
                    </div>
                    <div className="col-xs-4">
                        <div className="dropdown">
                            <select value={this.state.selectedAction} onChange={this.handleActionChange}
                                    className="form-control" style={this.props.editBtnsStyle}>
                                <option value="None">Select an Action</option>
                                <option value="tag">Add Tags</option>
                                <option value="rep">Replace Tags</option>
                                <option value="del">Delete</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-xs-2">
                    </div>
                    <div className="col-xs-2 btn btn-default" onClick={this.handlePrevClick}
                         style={{width: "14%", marginLeft: "1em"}}>
                        Previous
                    </div>
                    <div className="col-xs-2 btn btn-default" onClick={this.handleNextClick}
                         style={{width: "14%", marginLeft: "1em"}}>
                        Next
                    </div>
                </div>
                <h1>Pictures</h1>
                <PictureList columnWidth={this.props.columnWidth} data={this.state.data} selectPic={this.selectPic}
                             editMode={this.props.editMode} editBtnsStyle={this.props.editBtnsStyle}
                             deselectPic={this.deselectPic}/>
            </div>
        );
    }
});

var PictureList = React.createClass({
    selectPic: function (picId) {
        this.props.selectPic(picId);
    },
    deselectPic: function (picId) {
        this.props.deselectPic(picId);
    },
    render: function () {
        var columnWidth = this.props.columnWidth;
        var editMode = this.props.editMode;
        var editBtnsStyle = this.props.editBtnsStyle;
        return (
            <div className="pictureList">
                {this.props.data.pictures.map(function (picture) {
                    var editurl = "/mediaitem/" + picture.id;
                    var deselectHandler = this.deselectPic.bind(this, picture.id);
                    var selectHandler = this.selectPic.bind(this, picture.id);
                    return (
                        <Picture name={picture.name} thumburl={picture.thumb_url} picurl={picture.url}
                                 key={picture.id} width={columnWidth} editurl={editurl} deselectPic={deselectHandler}
                                 editMode={editMode} editBtnsStyle={editBtnsStyle} selectPic={selectHandler}/>
                    );
                }, this)};
            </div>
        );
    }
});

var Picture = React.createClass({
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

ReactDOM.render(
    <PictureDisplay url="/api/pictures"/>,
    document.getElementById('content')
);
