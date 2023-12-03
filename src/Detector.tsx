import React from 'react';

interface DetectorProps {
  readonly video?: HTMLVideoElement;
  readonly stream?: MediaStream;

  readonly onStartMoving?: () => void;
  readonly onStopMoving?: () => void;
}

function Detector(props: DetectorProps) {
  const [canvas, setCanvas] = React.useState<HTMLCanvasElement>();
  const [isMoving, setIsMoving] = React.useState(false);

  const setCanvasRef = React.useCallback(
    (canvas: HTMLCanvasElement) => {
      setCanvas(canvas);
    },
    [setCanvas],
  );

  React.useEffect(() => {
    let prev: ImageData | undefined = undefined;

    const timer = setInterval(() => {
      if (!canvas) return;
      if (!props.video) return;

      if (!canvas.width) return;

      const ctx = canvas.getContext('2d')!;

      if (!prev) {
        ctx.drawImage(props.video, 0, 0);
        prev = ctx.getImageData(0, 0, canvas.width, canvas.height);
        return;
      }

      ctx.drawImage(props.video, 0, 0, canvas.width, canvas.height);
      const curr = ctx.getImageData(0, 0, canvas.width, canvas.height);

      let count = 0;
      let total = 0;
      for (let i = 0; i < curr.data.length; i += 4) {
        const r = Math.abs(curr.data[i] - prev.data[i]);
        const g = Math.abs(curr.data[i + 1] - prev.data[i + 1]);
        const b = Math.abs(curr.data[i + 2] - prev.data[i + 2]);

        const diff = (r + g + b) / (3 * 255);
        if (diff > 0.1) {
          count++;
          prev.data[i] = 0;
          prev.data[i + 1] = 255;
          prev.data[i + 2] = 0;
        }

        total++;
      }
      ctx.putImageData(prev, 0, 0);

      const score = count / total;
      setIsMoving(score >= 0.01);

      prev = curr;
    }, 100);

    return () => clearTimeout(timer);
  }, [canvas, props.video]);

  React.useEffect(() => {
    if (isMoving) {
      props.onStartMoving?.();
    } else {
      props.onStopMoving?.();
    }
  }, [isMoving, props]);

  const settings = React.useCallback(() => {
    if (!props.stream) return;

    return props.stream.getVideoTracks()[0].getSettings();
  }, [props.stream]);

  return (
    <>
      <canvas
        ref={setCanvasRef}
        width={(settings()?.width ?? 0) / 10}
        height={(settings()?.height ?? 0) / 10}
      />
    </>
  );
}

export default Detector;
