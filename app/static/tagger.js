var Tagger = React.createClass({
  loadSelectedTagsFromServer: function() {
    $.ajax({
      url: this.props.selectedTagsUrl,
      dataType: 'json',
      cache: false,
      success: function(data) {
        var tags = this.state.data.tags;
        this.setState({data: {"tags": tags, "selectedTags": data.selectedTags}});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.selectedTagsUrl, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {
      data: {"selectedTags": [], "tags": []}
    };
  },
  componentDidMount: function() {
    if(this.props.selectedTagsUrl){
      this.loadSelectedTagsFromServer();
    }

    var substringMatcher = function(strs) {
      return function findMatches(q, cb) {
        var matches = [];
        var substrRegex = new RegExp(q, 'i');

        $.each(strs, function(i, str) {
          if (substrRegex.test(str)) {
            matches.push(str);
          }
        });

        cb(matches);
      };
    };
    $('#content .typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    },
    {
        name: 'tags',
        source: substringMatcher(theData)
    });
  },
  addTag: function(tag) {
    if(!this.state.data.selectedTags.includes(tag)){
      var tags = this.state.data.selectedTags;
      var allTags = this.state.data.tags;
      tags.push(tag);
      this.setState({data: {"tags": allTags, "selectedTags": tags}});
    }
  },
  handleKeyPress: function(event) {
    if(event.keyCode == 13 || event.keyCode == 188){
      this.addTag($('#tagInput').val());
      $('#tagInput').val('');
    }
  },
  render: function() {
    return (
      <div>
        <div className="col-xs-8">
          <SelectedTags selectedTags={this.state.data.selectedTags} />
        </div>

<div className="col-xs-4">
      <input id="tagInput" className="typeahead" type="text" placeholder="add a tag"
        onKeyUp={this.handleKeyPress} />
  </div>
      </div>
    );
  }
});

var SelectedTags = React.createClass({
  render: function() {
    console.log("rendering selected tags");
    if(this.props.selectedTags > 0){
      console.log("rendering tags");
      var tags = this.props.selectedTags.map(function (tag) {
        console.log(tag);
        <div className="tag" >
          tag
        </div>
      });
    }
    return (
      <div className="selectedTags">
        {tags}
      </div>
    );
  }
});

var theData;

var afun =  function() {
    $.ajax({
      url: "/api/all-tags",
      dataType: 'json',
      cache: false,
      success: function(data) {
        theData = data;
      }.bind(this),
      error: function(xhr, status, err) {
      }.bind(this)
    });
  };
 afun(); 
var handleKeyPress = function(event) {
    if(event.keyCode == 13 || event.keyCode == 188){
      this.props.addTag($('#tagInput').val());
      $('#tagInput').val('');
    }
  }

ReactDOM.render(
  <Tagger allTagsUrl="/api/all-tags" />,
  document.getElementById('content')

);

