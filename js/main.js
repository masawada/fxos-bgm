/**
 * Created by hiroqn on 15/03/30.
 */
var app = angular.module('fxosBgm', ['ngMaterial']);


var testJSON = [{
    album: "水星",
    artist: "tofubeats",
    artworkUrl: "http://is1.mzstatic.com/image/pf/us/r30/Music/v4/38/63/01/38630117-85a0-5307-d679-1d1d75539502/suiseijacket_mas.400x400-75.jpg",
    mp3Url: null,
    title: "水星(Original mix) [feat. オノマトペ大臣]",
    trackUrl: "https://itunes.apple.com/jp/album/shui-xing-original-mix-feat./id535718064?i=535718218&uo=4"
    },
    {
        album: "Don't Stop The Music",
        artist: "tofubeats",
        artworkUrl: "http://is1.mzstatic.com/image/pf/us/r30/Music4/v4/3d/fe/43/3dfe434e-9a79-a85e-723d-1b7a45f7c19d/825646365197.400x400-75.jpg",
        mp3Url: null,
        title: "Don't Stop The Music feat.森高千里",
        trackUrl: "https://itunes.apple.com/jp/album/dont-stop-music-feat.-sen/id724083591?i=724083632&uo=4"
    },
    {
        album: "lost decade (ボーナストラック バージョン)",
        artist: "tofubeats",
        artworkUrl: "http://is5.mzstatic.com/image/pf/us/r30/Music/v4/70/91/cf/7091cf2c-f0bb-e5fe-7727-6f5d95399628/tofu_lostdecade.400x400-75.jpg",
        mp3Url: null,
        title: "No.1 feat.G.RINA",
        trackUrl: "https://itunes.apple.com/jp/album/no.1-feat.g.rina/id623204999?i=623205057&uo=4"
    }];

app.controller('MainCtrl', function ($scope) {
    $scope.ctrlInfo = {
        level: 50,
        isPlay: false
    };
    $scope.music = testJSON[Math.floor(testJSON.length * Math.random())];
})