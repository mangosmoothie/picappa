function handleSumbitMediaItem() {
  var mi = buildMediaItem();
  
  $.ajax({
    url: '/api/mediaitem/',
    type: 'POST',
    data: JSON.stringify(mi),
    contentType: 'application/json',
    success: function(data) {
      var msg = 'successfully submitted update.';
      console.log(msg);
      popAlert(msg, 'SUCCESS');
      var returnUrl = getCookie("returnUrl");
      //redirect to cookie location
      if(returnUrl){
        console.log('redirecting to ' + returnUrl);
        window.location = returnUrl;
      }else{
        console.log('redirecting to root');
        window.location = "/";
      }
    }.bind(this),
    error: function(xhr, status, err) {
      var msg = 'ajax request failed: ' + err;
      console.error(msg);
      popAlert(msg, 'ERROR');
    }.bind(this)
  });
  
}

function buildMediaItem() {
  var mi = new Object();
  var name = $('#name');
  mi.name = name.val() ? name.val() : name.attr('placeholder');
  var desc = $('#desc');
  mi.desc = desc.val() ? desc.val() : desc.attr('placeholder');
  if (mi.desc == 'Description'){
    mi.desc = '';
  }
  mi.media_type_cd = $('#media_type_cd').val();
  mi.status_cd = $('#status_cd').val();
  return mi;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function loadMediaItemSelections() {
  $.ajax({
    url: '/api/mediaitem-selections',
    dataType: 'json',
    cache: false,
    success: function(data) {
      var statuses = data['statuses'];
      for (i = 0; i < statuses.length; i++) {   
        var value = statuses[i];
        $('#status_cd')
          .append($("<option></option>")
                  .attr("value",value['status_cd'])
                  .text(value['name'])); 
      }
      var types = data['media_types'];
      for (i = 0; i < types.length; i++) {   
        var value = types[i];
        $('#media_type_cd')
          .append($("<option></option>")
                  .attr("value",value['media_type_cd'])
                  .text(value['name'])); 
      }
    }.bind(this),
    error: function(xhr, status, err) {
      var msg = 'error loading mediaitme selections: ' + err;
      console.log(msg);
      popAlert(msg, 'ERROR');
    }.bind(this)
  });
}

function loadMediaItem (mediaitem_id) {
  $.ajax({
    url: "/api/mediaitem/" + mediaitem_id,
    type: 'GET',
    dataType: 'json',
    cache: false,
    success: function(data) {
      $('#name').attr('placeholder', data.name);
      $('#desc').attr('placeholder', (data.description ? data.description : 'Description'));
      $('#origin_date').html(data.origin_date);
      $('#added_date').html(data.added_date);
      $('#original_filename').html(data.original_filename);
      $('#modified_date').html(data.modified_date);
      $('#status_cd').val(data.status_cd);
      $('#media_type_cd').val(data.media_type_cd);
      $('#file_size').html(data.file_size);
    }.bind(this),
    error: function(xhr, status, err) {
      var msg = 'error loading mediaitem: ' + err;
      console.error(msg);
      popAlert(msg, 'ERROR');
    }.bind(this)
  });
}

function popAlert(msg, status){
  var ab = $('#alert');
  switch(status.toUpperCase()){
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
  ab.fadeTo(2000, 500).slideUp(500, function() {
    ab.attr('class', 'invisible');
  });
}
