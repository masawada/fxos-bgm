var API = function() {
  // override jQuery xhr
  jQuery.ajaxSettings.xhr = function() {
    try {
      return new XMLHttpRequest({mozSystem: true});
    } catch(e) {}
  };

  this.encodeQueue = [];
  this.playlist = [];
  this.apiBaseUrl = "http://52.68.23.123";
};

API.prototype = {
  startBuffer: function(term) {
    // 検索&連続コンバートの開始
    this.fetchPreviewJSON(term)
    .then(this.parseJSON.bind(this))
    .then(this.startConvert.bind(this));
  },
  stopBuffer: function() {
    this.stopConvert();
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
    data.results.forEach(function(item){
      this.encodeQueue.push({
        title:  item.trackName,
        album:  item.collectionName,
        artist: item.artistName,
        trackUrl: item.trackViewUrl,
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
