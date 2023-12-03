import React from 'react';
import VideoWrapper from './VideoWrapper';
import Detector from './Detector';
import JSZip from 'jszip';

function App() {
  const [video, setVideo] = React.useState<HTMLVideoElement>();
  const [stream, setStream] = React.useState<MediaStream>();
  const [hasStarted, setHasStarted] = React.useState(false);

  const [isReady, setIsReady] = React.useState(false);
  const [timerToGetReady, setMovingApprovalTimer] =
    React.useState<NodeJS.Timeout>();
  const [timerToTakePhoto, setStoppedApprovalTimer] =
    React.useState<NodeJS.Timeout>();

  const [images, setImages] = React.useState<string[]>([]);

  const onStartMoving = () => {
    if (timerToGetReady) return;

    clearTimeout(timerToTakePhoto);
    setStoppedApprovalTimer(undefined);

    setMovingApprovalTimer(
      setTimeout(() => {
        setIsReady(true);
      }, 1000),
    );
  };

  const onStopMoving = () => {
    if (timerToTakePhoto) return;

    clearTimeout(timerToGetReady);
    setMovingApprovalTimer(undefined);

    if (!isReady) return;

    setStoppedApprovalTimer(
      setTimeout(() => {
        if (!hasStarted) return;

        if (!video) return;

        const canvas = document.createElement('canvas');
        canvas.setAttribute('width', video.videoWidth.toString());
        canvas.setAttribute('height', video.videoWidth.toString());

        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(video, 0, 0);

        setImages((images) => [...images, canvas.toDataURL()]);

        console.log('Taking photo!');
      }, 3000),
    );
  };

  const onStart = () => {
    setHasStarted(true);
  };

  const onStop = () => {
    setHasStarted(false);

    const zip = new JSZip();
    images.forEach((image) => {
      zip.file(
        Date.now().toString() + '.png',
        image.substring(image.indexOf(',') + 1),
        {
          base64: true,
        },
      );
    });
    zip.generateAsync({ type: 'blob' }).then((zip) => {
      const blobUrl = window.URL.createObjectURL(zip);
      const anchor = window.document.createElement('a');
      anchor.download = 'Time-lapse.zip';
      anchor.href = blobUrl;
      anchor.click();
      window.URL.revokeObjectURL(blobUrl);
    });
  };

  return (
    <div>
      <VideoWrapper
        videoRef={(video) => setVideo(video)}
        onStreamChange={(stream) => setStream(stream)}
      />
      <Detector
        video={video}
        stream={stream}
        onStartMoving={onStartMoving}
        onStopMoving={onStopMoving}
      />
      <button disabled={hasStarted} onClick={onStart}>
        Start
      </button>
      <button disabled={!hasStarted} onClick={onStop}>
        Stop
      </button>
    </div>
  );
}

export default App;
