function Kibana() {
    this.getIframeUrl = function (usenrame, onSuccess) {
      $.get(`/api/users/${usenrame}/chartUrl`, function (data) {
          onSuccess(data.url);
      });
    };
}
