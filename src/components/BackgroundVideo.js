import React, { Component } from 'react';
import VideoCover from 'react-video-cover';

class BackgroundVideo extends Component {
  render() {
    const videoOptions = {
      src: 'https://r8---sn-8xgp1vo-2iae.googlevideo.com/videoplayback?ei=_7bsW-j8D7Gihwbh0ZugBw&lmt=1542217532470833&pl=17&dur=3.111&ipbits=0&ip=96.232.187.141&expire=1542261599&mime=video/mp4&key=yt6&signature=375295FA37F74ADD11BBCE471F6CC00E8F886FA3.675D759DF9218C2DE457DED0D1AA6F3B102E83F7&sparams=dur,ei,id,initcwndbps,ip,ipbits,itag,lmt,mime,mm,mn,ms,mv,pl,ratebypass,requiressl,source,expire&initcwndbps=1640000&c=WEB&mm=31,29&mn=sn-8xgp1vo-2iae,sn-ab5sznly&id=o-AL7WtV4J20RbPiQ00KWraLleNx1sFm4CffaNcjZ9_tZL&fvip=2&requiressl=yes&mt=1542239872&ratebypass=yes&mv=m&ms=au,rdu&source=youtube&itag=22&txp=2211222',
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
