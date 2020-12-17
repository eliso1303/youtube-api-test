import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'youtube-api';

  public YT: any;
  public video: any;
  public player: any;
  public reframed: Boolean = false;

  public showOverlay = true;

  isRestricted = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  init() {
    if (window['YT']) {
      this.startVideo();
      return;
    }

    let tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window['onYouTubeIframeAPIReady'] = () => this.startVideo();
  }

  ngOnInit() {
    this.video = 'dZnHbLKxyro';
  }

  onClickOverlay() {
    this.showOverlay = false;
    this.init();
  }

  startVideo() {
    this.reframed = false;
    this.player = new window['YT'].Player('player', {
      videoId: this.video,
      height: "100%",
      width: "100%",
      position: "absolute",
      top: "0",
      playerVars: {
        autoplay: 1,
        modestbranding: 1,
        controls: 1,
        disablekb: 1,
        rel: 0,
        showinfo: 0,
        fs: 0,
        playsinline: 1
      },
      events: {
        //   'onStateChange': this.onPlayerStateChange.bind(this),
        //   'onError': this.onPlayerError.bind(this),
        'onReady': this.onPlayerReady.bind(this),
      }
    });
  }

  onPlayerReady(event) {
    if (this.isRestricted) {
      event.target.mute();
      event.target.playVideo();
    } else {
      event.target.playVideo();
    }
  }

}

