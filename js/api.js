var API = function() {
  // override jQuery xhr
  jQuery.ajaxSettings.xhr = function() {
    try {
      return new XMLHttpRequest({mozSystem: true});
    } catch(e) {}
  };

  this.encodeQueue = [];
  this.playlist = [];
  this.playlistSize = 0;
  this.apiEndpoint = "http://52.68.23.123/cgi-bin/music.py";
};

API.prototype = {
  initProperties: function() {
    this.encodeQueue = [];
    this.playlist = [];
    this.playlistSize = 0;
  },
  initWithTerm: function(term) {
    this.initProperties();
    return this.fetchPreviewJSON(term)
    .then(this.parseJSON.bind(this))
    .then(this.prefetch.bind(this));
  },

  prefetch: function() {
    return this.convertRequest()
    .then(this.convertRequest.bind(this))
    .then(this.convertRequest.bind(this))
    .then(this.convertRequest.bind(this))
    .then(this.convertRequest.bind(this));
  },

  parseJSON: function(data) {
    this.playlistSize = data.resultCount;
    data.results.forEach(function(item){
      this.encodeQueue.push({
        title:  item.trackName,
        album:  item.collectionName,
        artist: item.artistName,
        trackUrl: item.trackViewUrl,
        m4aUrl: item.previewUrl,
        mp3Url: null,
        artworkUrl: item.artworkUrl100.replace("100x100-75.jpg", "400x400-75.jpg")
      });
    }.bind(this));
  },

  // API request
  fetchPreviewJSON: function(term) {
    // iTunes APIからJSONを取得してパース
    return $.ajax({
      url: "http://itunes.apple.com/search",
      type: "GET",
      dataType: "json",
      data: {
        term: term,
        country: "JP",
        media: "music",
        limit: "200"
      },
    });
  },
  convertRequest: function() {
    // AWSにエンコードリクエスト
    var d = new $.Deferred();
    var rnd = Math.floor(Math.random * this.encodeQueue.length);
    var item = this.encodeQueue.splice(rnd, 1)[0];
    $.ajax({
      url: this.apiEndpoint,
      type: "GET",
      dataType: "json",
      success: function(data){
        item.mp3Url = data.URI;
        this.playlist.push(item);
        d.resolve();
      }.bind(this),
      data: {
        uri: item.m4aUrl
      }
    });
    return d.promise();
  }
};
