
import { usePlayerStore } from "@/store/playerstore"
import { Pause,Play } from "./player"
import { songs } from "@/lib/data"



export function CardPlayButton({id,size="small"}){
    const { 
        currentMusic,
        isPlaying, 
        setIsPlaying,
        setCurrentMusic
        }=usePlayerStore(state=>state)

        const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id
        
    const handleClick = ()=>{
        if(isPlayingPlaylist){
            setIsPlaying(false)
            return
        }

        fetch(`/api/get-info-playlist.json?id=${id}`)
        .then(res =>res.json())
        .then(data=>{
            const{songs,playlist}=data

            setIsPlaying(true)
            setCurrentMusic({songs,playlist,song: songs[0]})

            console.log({songs,playlist})
        })
        
    }

    const iconClassName = size === "small" ? "w-4 h-4" : "w-4 h-4"
    

    return(
        <button onClick={handleClick} className="card-play-button rounded-full bg-green-500 p-2 hover:scale-105 transition hover:bg-green-400">
            { isPlayingPlaylist ? <Pause className={iconClassName}/> : <Play className={iconClassName} /> }
        </button>
    )
}