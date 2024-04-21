import React from 'react';
import Form from './Form';
import GooglePlayButton from './GooglePlayButton';
import AppStoreButton from './AppStoreButton';

function App() {
  const printerColor = '#3c3c3c';
  const extruderColor = 'grey';
  const extruderShadowColor = 'lime';

  const limitLeftRef = React.useRef<HTMLDivElement>(null);
  const limitRightRef = React.useRef<HTMLDivElement>(null);
  const extruderRef = React.useRef<HTMLDivElement>(null);
  const extruderShadowRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    document.addEventListener('mousemove', function (e) {
      if (extruderRef.current === null) {
        return;
      }

      if (limitLeftRef.current === null) {
        return;
      }

      if (limitRightRef.current === null) {
        return;
      }

      const rect = extruderRef.current.getBoundingClientRect();
      const limitLeftRect = limitLeftRef.current.getBoundingClientRect();
      const limitRightRect = limitRightRef.current.getBoundingClientRect();

      const left =
        Math.min(
          Math.max(e.x, limitLeftRect.right + rect.width / 2),
          limitRightRect.left - rect.width / 2,
        ) + 'px';

      extruderRef.current.style.left = left;

      setTimeout(() => {
        if (extruderShadowRef.current === null) {
          return;
        }

        extruderShadowRef.current.style.left = left;
      }, 50);
    });
  }, []);

  return (
    <div style={{padding:'5rem'}}>
    <div
      style={{
        display: 'grid',
        gridTemplateAreas: `
            ' b  c  c  c  c  c  d'
            ' e  f  g  g  g  h  i'
            ' j  j  j  j  j  j  j'
            ' k  l  m  m  m  n  o'
            ' p  q  r  s  t  u  v'
            ' w  x  y  y  y  z aa'
            'ab ab ac ac ac ad ad'
          `,
        gridTemplateRows: '5rem 15rem 5rem 15rem 1fr 5rem 10rem',
        gridTemplateColumns: '5rem 5rem 10rem 1fr 10rem 5rem 5rem',
      }}
    >

      <div style={{ gridArea: 'b' }} />
      <div style={{ gridArea: 'c', background: printerColor }} />
      <div style={{ gridArea: 'd' }} />

      <div style={{ gridArea: 'e' }} />
      <div
        ref={limitLeftRef}
        style={{ gridArea: 'f', background: printerColor }}
      />
      <div style={{ gridArea: 'g' }} />
      <div
        ref={limitRightRef}
        style={{ gridArea: 'h', background: printerColor }}
      />
      <div style={{ gridArea: 'i' }} />

      <div style={{ gridArea: 'j', background: printerColor }} />

      <div style={{ gridArea: 'k' }} />
      <div style={{ gridArea: 'l', background: printerColor }} />
      <div style={{ gridArea: 'm' }} />
      <div style={{ gridArea: 'n', background: printerColor }} />
      <div style={{ gridArea: 'o' }} />

      <div style={{ gridArea: 'p' }} />
      <div style={{ gridArea: 'q', background: printerColor }} />
      <div style={{ gridArea: 'r' }} />
      <div style={{ gridArea: 's' }}>
        <Form />
      </div>
      <div style={{ gridArea: 't' }} />
      <div style={{ gridArea: 'u', background: printerColor }} />
      <div style={{ gridArea: 'v' }} />

      <div style={{ gridArea: 'w' }} />
      <div style={{ gridArea: 'x', background: printerColor }} />
      <div style={{ gridArea: 'y' }} />
      <div style={{ gridArea: 'z', background: printerColor }} />
      <div style={{ gridArea: 'aa' }} />

      <div style={{ gridArea: 'ab', background: printerColor }} />
      <div style={{ gridArea: 'ac', background: printerColor }}>
        <div
          style={{
            display: 'grid',
            width: '100%',
            height: '100%',
            gridTemplateAreas: `
              'a  b'
              'a  c'
            `,
            gridTemplateRows: '0.5fr 0.5fr',
            gridTemplateColumns: '0.5fr 0.5fr',
          }}
        >
          <div
            style={{
              gridArea: 'a',
              alignSelf: 'center',
              justifySelf: 'center',
              color: 'white',
            }}
          >
            <p>Welcome to my website!</p>
            <p>
              Use it to modify the G-code of your 3D models and make your 3D
              printer stop at the end of each layer. This is useful for recoding
              those fancy 3D print time-lapses.
            </p>
            <p>
              If you want to capture time-lapses using just your phone without
              any additional hardware, feel free to download my app!
            </p>
          </div>
          <div style={{ position: 'relative', gridArea: 'b' }}>
            <GooglePlayButton
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                maxWidth: '80%',
                maxHeight: '80%',
              }}
            />
          </div>
          <div style={{ position: 'relative', gridArea: 'c' }}>
            <AppStoreButton
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                maxWidth: '80%',
                maxHeight: '80%',
              }}
            />
          </div>
        </div>
      </div>
      <div style={{ gridArea: 'ad', background: printerColor }} />

      <div
        ref={extruderShadowRef}
        style={{
          display: 'grid',
          position: 'absolute',
          gridTemplateAreas: `
              'a a a'
              'b c d'
            `,
          top: '30rem',
          gridTemplateRows: '15rem 5rem',
          gridTemplateColumns: '5rem 5rem 5rem',
          transform: 'translate(-50%, -50%)',
          left: '17.5rem',
        }}
      >
        <div style={{ gridArea: 'a', background: extruderShadowColor }} />
        <div style={{ gridArea: 'b' }} />
        <div style={{ gridArea: 'c', background: extruderShadowColor }} />
        <div style={{ gridArea: 'd' }} />
      </div>

      <div
        ref={extruderRef}
        style={{
          display: 'grid',
          position: 'absolute',
          gridTemplateAreas: `
              'a a a'
              'b c d'
            `,
          top: '30rem',
          gridTemplateRows: '15rem 5rem',
          gridTemplateColumns: '5rem 5rem 5rem',
          transform: 'translate(-50%, -50%)',
          left: '17.5rem',
        }}
      >
        <div style={{ gridArea: 'a', background: extruderColor }} />
        <div style={{ gridArea: 'b' }} />
        <div style={{ gridArea: 'c', background: extruderColor }} />
        <div style={{ gridArea: 'd' }} />

        <h1
          style={{
            position: 'absolute',
            margin: 0,
            left: '7.5rem',
            top: '7.5rem',
            transform: 'translate(-50%, -50%)',
            whiteSpace: 'nowrap',
            color: 'white',
            fontFamily: 'Roboto',
          }}
        >
          <a href="https://github.com/3d-easylapse" style={{ color: 'white' }}>
            3D EasyLapse
          </a>
        </h1>
      </div>
    </div>
    </div>
  );
}

export default App;
