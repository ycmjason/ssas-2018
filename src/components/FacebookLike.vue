<template>
  <div class="fb-like" data-href="https://www.facebook.com/SSAS-209255539976525" data-layout="standard" data-action="like" data-size="small" data-show-faces="true" data-share="true"></div>
</template>

<script>
export default {
  mounted () {
    if (!window.FB) {
      (function(d, s, id) {
        // eslint-disable-next-line
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v3.2&appId=287564441844404&autoLogAppEvents=1';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    } else {
      window.FB.XFBML.parse();
    }
  },
};
</script>
