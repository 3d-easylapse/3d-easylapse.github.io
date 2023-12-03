import React from 'react';

interface VideoWrapperProps {
  readonly videoRef?: (video: HTMLVideoElement) => void;
  readonly onStreamChange?: (stream: MediaStream) => void;
}

function VideoWrapper(props: VideoWrapperProps) {
  const [video, setVideo] = React.useState<HTMLVideoElement>();
  const [stream, setStream] = React.useState<MediaStream>();

  const setVideoRef = React.useCallback(
    (video: HTMLVideoElement) => {
      setVideo(video);
      props.videoRef?.(video);
    },
    [props],
  );

  React.useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then((stream) => {
        setStream(stream);
      });
  }, []);

  React.useEffect(() => {
    if (stream) {
      props.onStreamChange?.(stream);
    }
  }, [props, stream]);

  React.useEffect(() => {
    if (stream && video) {
      video.srcObject = stream;
    }
  }, [video, stream]);

  return <video ref={setVideoRef} autoPlay muted />;
}

export default VideoWrapper;
