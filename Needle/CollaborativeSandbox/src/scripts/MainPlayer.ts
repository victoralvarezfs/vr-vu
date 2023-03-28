import { Behaviour, serializable } from "@needle-tools/engine";
import { StreamPlayer } from "./StreamPlayer";
import { InputField } from "@needle-tools/engine/engine-components/ui/InputField";

const videoSrc = "https://stream.mux.com/";
const extension = ".m3u8";
const playbackIdExample = "Fyvwzkck4pfe149v4geCckdbR5rq9fJbWLhPVGSKh44";

export class MainPlayer extends Behaviour
{
    @serializable(StreamPlayer) 
    streamPlayers: StreamPlayer[] | null = null;

    @serializable(InputField)
    playbackId?: InputField;

    start()
    {
        this.streamPlayers = this.gameObject.getComponentsInChildren(StreamPlayer);
        this.streamPlayers.forEach(function(value)
        {
            console.log("stream player: ", value.gameObject.name);
        });
    }

    playLivestreamSource()
    {
        let sourceURL: string =
        videoSrc +
        (this.playbackId == null || this.playbackId.text == "" ? playbackIdExample : this.playbackId.text) +
        extension;
        this.streamPlayers?.forEach(function(value)
        {
            value.openLivestreamSource(sourceURL);
        });
    }
}