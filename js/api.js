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
  this.apiBaseUrl = "http://52.68.23.123";
};

API.prototype = {
  initProperties: function() {
    this.encodeQueue = [];
    this.playlist = [];
    this.playlistSize = 0;
  },
  initWithTerm: function(term) {
    this.initProperties();
    this.fetchPreviewJSON(term)
    .then(this.parseJSON.bind(this))
    .then(this.startConvert.bind(this));
  },

  // sequential convert
  startConvert: function() {
    // observeStatusでエンコード可能かチェック
    // 未エンコードのAAC URLをサーバに投げる
  },
  stopConvert: function() {
    // 連続コンバートをとりやめる
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
  requestConvert: function(uri) {
    // AWSにエンコードリクエスト
    $.ajax({
      url: this.apiBaseUrl + "/music",
      type: "GET",
      dataType: "json",
      success: this.parseJSON.bind(this),
      data: {
        uri: uri
      },
    });
  }
};
