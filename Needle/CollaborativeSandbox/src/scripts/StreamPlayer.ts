import { Behaviour, serializeable, VideoPlayer } from "@needle-tools/engine";
import { InputField } from "@needle-tools/engine/src/engine-components/ui/InputField";
import { Object3D } from "three";
import Hls from "hls.js";

const videoSrc = "https://stream.mux.com/";
const extension = ".m3u8";
const playbackIdExample = "Fyvwzkck4pfe149v4geCckdbR5rq9fJbWLhPVGSKh44";

export class StreamPlayer extends Behaviour {

  @serializeable(null)
  videos?: Array<string>;
  @serializeable(Object3D)
  vidPlayer: VideoPlayer = new VideoPlayer();
  @serializeable(InputField)
  playbackId?: InputField;

  hls = new Hls();

  start()
  {
    
  }

  onPointerClick() {
    console.log("Stream Player script running...");
    let exampleUrl: string =
      videoSrc +
      (this.playbackId == null || this.playbackId.text == ""
        ? playbackIdExample
        : this.playbackId.text) +
      extension;
    this.PlayStream(exampleUrl);
  }

  secondCameraAngle() {
    console.log("Stream Player script running...");
    let exampleUrl: string =
      videoSrc +
      (this.playbackId == null || this.playbackId.text == ""
        ? playbackIdExample
        : this.playbackId.text) +
      extension;
    this.PlayStream(exampleUrl);
  }

  thirdCameraAngle() {
    console.log("Stream Player script running...");
    let exampleUrl: string =
      videoSrc +
      (this.playbackId == null || this.playbackId.text == ""
        ? playbackIdExample
        : this.playbackId.text) +
      extension;
    this.PlayStream(exampleUrl);
  }

  openLivestreamSource(newurl:string) {    
    this.PlayStream(newurl);
  }

  private PlayStream(url: string) {
    console.log("***Play stream: " + url);
    this.vidPlayer.stop();
    this.vidPlayer.setClipURL(url);
    if (this.vidPlayer.videoElement != null) {
      this.hls.attachMedia(this.vidPlayer.videoElement);
    }
    this.hls.on(Hls.Events.MEDIA_ATTACHED, () => {
      this.hls.loadSource(url);
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        this.vidPlayer.play();
        console.log("should be playing");
      });
    });

    this.vidPlayer.play();
  }
}
