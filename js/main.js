/**
 * Created by hiroqn on 15/03/30.
 */
var app = angular.module('fxosBgm', ['ngMaterial']);

app.controller('MainCtrl', ['$scope', '$element', function ($scope, $element) {
    $scope.ctrlInfo = {
        level: 50,
        isPlay: false,
        word: ''
    };

    //var context = new AudioContext();
    var audio = new Audio();
    audio.volume = 0.5;
    audio.addEventListener('loadstart', function () {
        audio.play();
        $scope.ctrlInfo.isPlay = true;
    });
    audio.addEventListener('ended', function () {
        $scope.onPlayNext();

        api.convertRequest()
            .then(function() {
                // コンバート後
            });
    });
//// url = URL.createObjectURL(file_or_blob)
    $scope.music = {
        album: "水星",
            artist: "tofubeats",
            artworkUrl: "http://is1.mzstatic.com/image/pf/us/r30/Music/v4/38/63/01/38630117-85a0-5307-d679-1d1d75539502/suiseijacket_mas.400x400-75.jpg",
            mp3Url: null,
            title: "水星(Original mix) [feat. オノマトペ大臣]",
            trackUrl: "https://itunes.apple.com/jp/album/shui-xing-original-mix-feat./id535718064?i=535718218&uo=4"
    };

    $scope.$watch('ctrlInfo.level', function (newValue, oldValue) {
        audio.volume = newValue / 100;
    })
    $scope.onPlayOrPause = function () {
        $scope.ctrlInfo.isPlay? audio.pause() : audio.play();
        $scope.ctrlInfo.isPlay =!$scope.ctrlInfo.isPlay;
    };
    $scope.onPlayNext = function () {
        count++;
        $scope.music = api.playlist[count];
        audio.src = api.playlist[count].mp3Url;
    };
    var count = 0;

    var api = new API();
    $scope.onSearch = function () {
        api.initWithTerm($scope.ctrlInfo.word)
            .then(function(){
                count = 0;
                $scope.music = api.playlist[count];
                audio.src = api.playlist[count].mp3Url;
                //audio.play();
                // api.playlistに5曲mp3が入っている状態
            });
        // 次の曲をコンバート
        //api.convertRequest()
        //    .then(function() {
        //        // コンバート後
        //    });
    };
}]);