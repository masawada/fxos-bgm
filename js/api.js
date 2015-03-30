var API = function() {
  this.playlist = [];
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
    console.log(data)
  },
  // API request
  fetchPreviewJSON: function(term) {
    // iTunes APIからJSONを取得してパース
    $.ajax({
      url: "itunes.apple.com/search",
      type: "GET",
      dataType: "json",
      success: this.parseJSON
      data: {
        term: term
        country: "JP"
        media: "music"
        limit: "200"
      },
    });
    return JSON.parse(jsonString);
  },
  requestConvert: function() {
    // AWSにエンコードリクエスト
  },
  observeStatus: function() {
    // ステータスのチェック
    
  }
};
