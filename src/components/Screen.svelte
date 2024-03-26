<script>
  export let imageSource = '';
  export let imageAlt = '';
</script>

<div class="screen">
  <div id="topPicture">
    <div id="buttontopPicture1"></div>
    <div id="buttontopPicture2"></div>
  </div>
  <figure class="image is-4by3">
    <img src={imageSource} alt={imageAlt} height="170" />
  </figure>
  <div id="buttonbottomPicture"></div>
  <div id="speakers">
    <div class="sp"></div>
    <div class="sp"></div>
    <div class="sp"></div>
    <div class="sp"></div>
  </div>
</div>

<style>
  .screen {
    --screen-bg-color: #dedede;
    --screen-border-color: #dedede;

    height: 245px;
    width: 260px;
    position: relative;
    padding: 0 20px;
    background-color: var(--screen-bg-color);
    border-radius: 15px;
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    -o-border-radius: 15px;

    &:after {
      content: '';
      border-top: 40px solid var(--screen-border-color);
      border-left: 40px solid var(--background-color);
      height: 0;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }

  div#picture {
    height: 175px;
    width: 254px;
    margin-top: 20px;
    margin-bottom: 9px;
    background-color: #fff;
    border: 3px solid #494949;
    clear: both;

    border-radius: 15px;
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    -o-border-radius: 15px;
  }

  div#picture img {
    display: block;
    margin: 0 auto;
  }

  div#topPicture {
    margin: 6px auto;
    width: 40px;
  }

  div#buttontopPicture1,
  div#buttontopPicture2 {
    height: 8px;
    width: 8px;
    background-color: #c00d0d;
    border: 1px solid #000;
    float: left;

    border-radius: 15px;
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    -o-border-radius: 15px;
  }

  div#buttontopPicture1 {
    margin-right: 20px;
  }

  div#buttonbottomPicture {
    height: 26px;
    width: 26px;
    background-color: #c00d0d;
    margin-left: 35px;
    float: left;

    border-radius: 30px;
    -webkit-border-radius: 30px;
    -moz-border-radius: 30px;
    -o-border-radius: 30px;

    box-shadow: -2px 1px #5e0000;
    -webkit-box-shadow: -2px 1px #5e0000;
    -moz-box-shadow: -2px 1px #5e0000;
    -o-box-shadow: -2px 1px #5e0000;

    background: linear-gradient(top, #c00d0d 0%, #8b0000 80%);
    background: -webkit-linear-gradient(top, #c00d0d 0%, #8b0000 80%);
    background: -moz-linear-gradient(top, #c00d0d 0%, #8b0000 80%);
    background: -o-linear-gradient(top, #c00d0d 0%, #8b0000 80%);
  }

  div#speakers {
    float: right;
    width: 75px;
    height: 25px;
    margin-right: 20px;
  }

  div.sp {
    height: 3px;
    margin-bottom: 5px;
    background-color: #494949;

    border-radius: 30px;
    -webkit-border-radius: 30px;
    -moz-border-radius: 30px;
    -o-border-radius: 30px;
  }

  div#bigbluebutton {
    height: 50px;
    width: 50px;
    background-color: #000;

    position: absolute;
    top: 395px;
    left: 30px;

    border-radius: 100px;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    -o-border-radius: 100px;

    background: linear-gradient(top, #307bfb 0%, #0530e5 80%);
    background: -webkit-linear-gradient(top, #307bfb 0%, #0530e5 80%);
    background: -moz-linear-gradient(top, #307bfb 0%, #0530e5 80%);
    background: -o-linear-gradient(top, #307bfb 0%, #0530e5 80%);

    box-shadow: -3px 2px #001c91;
    -webkit-box-shadow: -3px 2px #001c91;
    -moz-box-shadow: -3px 2px #001c91;
    -o-box-shadow: -3px 2px #001c91;
  }

  div#barbutton1 {
    height: 13px;
    width: 50px;

    position: absolute;
    top: 405px;
    left: 100px;

    border-radius: 100px;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    -o-border-radius: 100px;

    background: linear-gradient(top, #50fb05 0%, #057b05 100%);
    background: -webkit-linear-gradient(top, #50fb05 0%, #057b05 100%);
    background: -moz-linear-gradient(top, #50fb05 0%, #057b05 100%);
    background: -o-linear-gradient(top, #50fb05 0%, #057b05 100%);

    box-shadow: -1px 2px #004200;
    -webkit-box-shadow: -1px 2px #004200;
    -moz-box-shadow: -1px 2px #004200;
    -o-box-shadow: -1px 2px #004200;
  }

  div#barbutton2 {
    height: 13px;
    width: 50px;

    position: absolute;
    top: 405px;
    left: 165px;

    border-radius: 100px;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    -o-border-radius: 100px;

    background: linear-gradient(top, #fb6505 0%, #bb0505 100%);
    background: -webkit-linear-gradient(top, #fb6505 0%, #bb0505 100%);
    background: -moz-linear-gradient(top, #fb6505 0%, #bb0505 100%);
    background: -o-linear-gradient(top, #fb6505 0%, #bb0505 100%);

    box-shadow: -1px 2px #7b0000;
    -webkit-box-shadow: -1px 2px #7b0000;
    -moz-box-shadow: -1px 2px #7b0000;
    -o-box-shadow: -1px 2px #7b0000;
  }
</style>
