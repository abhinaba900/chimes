import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const audioSrc = "/assets/Healing Chimes (mp3cut.net).mp3";

  const requestAudioPermission = async () => {
    try {
      // Request microphone permission (which indirectly grants audio playback rights)
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Immediately stop the microphone access (we only needed the permission)
      stream.getTracks().forEach((track) => track.stop());

      setIsPermissionGranted(true);

      // Automatically start playback after permission is granted
      await audioRef.current?.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Audio permission denied:", error);
      setIsPermissionGranted(false);
    }
  };

  const togglePlayPause = async () => {
    if (!audioRef.current) return;

    if (!isPermissionGranted) {
      // Request permission when first clicking play
      await requestAudioPermission();
      return;
    }

    try {
      if (isPlaying) {
        await audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error("Playback error:", error);
    }
  };

  useEffect(() => {
    requestAudioPermission();
  }, []);

  return (
    <div className="relative">
      <button
        onClick={togglePlayPause}
        className="focus:outline-none"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        <Image
          src="/assets/music-icon.svg"
          alt={isPlaying ? "Pause icon" : "Play icon"}
          width={44}
          height={44}
          className={isPlaying ? "opacity-100" : "opacity-70"}
        />
      </button>

      <audio
        ref={audioRef}
        src={audioSrc}
        autoPlay
        loop
        className="hidden"
      />
    </div>
  );
};

export default AudioPlayer;
