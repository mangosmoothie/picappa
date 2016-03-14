var Tagger = React.createClass({
  render: function() {
    return (
      <div>
        <div className="col-xs-8">
          <SelectedTags selectedTagsUrl={this.props.selectedTagsUrl} />
        </div>
        <div className="col-xs-4">
          <TagPicker allTagsUrl={this.props.allTagsUrl} />
        </div>
      </div>
    );
  }
});

var SelectedTags = React.createClass({
  loadSelectedTagsFromServer: function() {
    $.ajax({
      url: this.props.selectedTagsUrl,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.selectedTagsUrl, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {
      data: {"selectedTags": []}
    };
  },
  componentDidMount: function() {
    if(this.props.selectedTagsUrl){
      this.loadSelectedTagsFromServer();
    }
  },
  render: function() {
    if(this.props.data){
      var tags = this.props.data.selectedTags.map(function (tag) {
          <div className="tag" >
          {tag}
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

var TagPicker = React.createClass({
  loadAllTags: function() {
    $.ajax({
      url: this.props.allTagsUrl,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.allTagsUrl, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {
      data: {"tags": []}
    };
  },
  componentDidMount: function() {
    this.loadAllTags();
  },
  render: function() {
    var substringMatcher = function(strs) {
      return function findMatches(q, cb) {

        // an array that will be populated with substring matches
        var matches = [];

        // regex used to determine if a string contains the substring `q`
        var substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
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
            source: substringMatcher(['New', 'Old', 'Newd'])
        });
    return (
      <input className="typeahead" type="text" placeholder="add a tag" />
    );
  }
});
  
ReactDOM.render(
  <Tagger allTagsUrl="/api/all-tags" />,
  document.getElementById('content')

);

