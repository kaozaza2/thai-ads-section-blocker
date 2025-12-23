//PLAYER
const player = jwplayer("player");
const videoContainer = $('#video-container');
player.on('complete', function() {
    exemplar.skipAd();
});
player.on('setupError', function() {
    $('#video-container').addClass('embed-responsive embed-responsive-16by9').html('<iframe class="embed-responsive-item" src="' + source.files.onError + '" width="100%" height="100%" frameborder="0" allowfullscreen="allowfullscreen"></iframe>');
});
player.on('error', function() {
    exemplar.skipAd();
});
const exemplar = {
    setup: function({ ad, poster, files }) {
        if (files.type == 'iframe') {
            $('#video-container').addClass('embed-responsive embed-responsive-16by9').html('<iframe class="embed-responsive-item" src="' + files.url + '" width="100%" height="100%" frameborder="0" allowfullscreen="allowfullscreen"></iframe>');
        } else {

            player.setup({
                width: "100%",
                aspectratio: "16:9",
                primary: "html5",
                autostart: true,
                volume: "25",
                sources: files.url,
            });
        }
    },

    setOverlay: function(ad) {},
    skipAd: function() {}
};
