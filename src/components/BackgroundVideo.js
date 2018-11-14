import React, { Component } from 'react';
import VideoCover from 'react-video-cover';

class BackgroundVideo extends Component {
  render() {
    const videoOptions = {
      src: 'https://r2---sn-8xgp1vo-ab5l.googlevideo.com/videoplayback?ip=96.232.187.141&mime=video/mp4&pl=17&txp=2211222&mm=31,29&itag=22&ipbits=0&ms=au,rdu&mt=1542217470&mn=sn-8xgp1vo-ab5l,sn-ab5l6n6e&mv=m&initcwndbps=1343750&expire=1542239165&signature=68BB39D72AA7FC129D338D7EDC131C77EB8A4BA3.0BCA81195D8B85182F81FA0EAB86A532359145F1&key=yt6&id=o-AOoPyVqGEsi_yqg-pBD2vXdNU0ShHfqtv6yqb4N0u3O-&sparams=dur,ei,id,initcwndbps,ip,ipbits,itag,lmt,mime,mm,mn,ms,mv,pl,ratebypass,requiressl,source,expire&ratebypass=yes&requiressl=yes&lmt=1542217532470833&ei=XV_sW5OjJcW68gTqj6uICA&c=WEB&dur=3.111&source=youtube&fvip=2',
      ref: videoRef => {
        this.videoRef = videoRef;
      },
      autoPlay: true,
      loop: true,
      className: "fullscreen-bg__video",
    };
    return (
      <div style={{
        width: '1280px',
        height: '720px',
        overflow: 'hidden',
      }}>
        <VideoCover
          videoOptions={videoOptions}
        />
      </div>
    );
  }
}

export default BackgroundVideo;
