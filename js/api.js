var API = function() {
  // override jQuery xhr
  jQuery.ajaxSettings.xhr = function() {
    try {
      return new XMLHttpRequest({mozSystem: true});
    } catch(e) {}
  };

  this.playlist = [];
  this.apiBaseUrl = "http://52.68.23.123"
};

API.prototype = {
  startBuffer: function(term) {
    // 検索&連続コンバートの開始
    this.fetchPreviewJSON(term);
    this.startConvert();
  },
  stopBuffer: function() {
    this.stopConvert();
  },

  startConvert: function() {
    // observeStatusでエンコード可能かチェック
    // 未エンコードのAAC URLをサーバに投げる
  },
  stopConvert: function() {
    // 連続コンバートをとりやめる
  },

  parseJSON: function(data) {
    data.results.foreach(function(item){
      this.playlist.push({
        title:  item.trackName,
        album:  item.collectionName,
        artist: item.artistName,
        trackUrl: item.trackViewUrl,
        mp3Url: null,
        artworkUrl: item.artWorkUrl100
      })
    }.bind(this));
    console.log(this.playlist);
  },
  // API request
  fetchPreviewJSON: function(term) {
    // iTunes APIからJSONを取得してパース
    $.ajax({
      url: "http://itunes.apple.com/search",
      type: "GET",
      dataType: "json",
      success: this.parseJSON,
      data: {
        term: term,
        country: "JP",
        media: "music",
        limit: "200"
      },
    });
  },
  requestConvert: function() {
    // AWSにエンコードリクエスト
    
  },
  observeStatus: function() {
    // ステータスのチェック

  }
};
