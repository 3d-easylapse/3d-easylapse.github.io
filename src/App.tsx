import React from 'react';
import Form from './Form';

function App() {
  const printerColor = '#3c3c3c';
  const extruderColor = 'grey';
  const extruderShadowColor = 'lime';

  const extruderRef = React.useRef<HTMLDivElement>(null);
  const extruderShadowRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    document.addEventListener('mousemove', function (e) {
      if (extruderRef.current === null) {
        return;
      }

      const left =
        e.pageX / parseFloat(getComputedStyle(extruderRef.current).fontSize);
      const width =
        document.body.clientWidth /
        parseFloat(getComputedStyle(extruderRef.current).fontSize);

      extruderRef.current.style.left =
        Math.min(Math.max(left, 17.5), width - 17.5) + 'rem';
      setTimeout(() => {
        if (extruderShadowRef.current === null) {
          return;
        }

        extruderShadowRef.current.style.left =
          Math.min(Math.max(left, 17.5), width - 17.5) + 'rem';
      }, 50);
    });
  }, []);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateAreas: `
            ' a  a  a  a  a  a  a'
            ' b  c  c  c  c  c  d'
            ' e  f  g  g  g  h  i'
            ' j  j  j  j  j  j  j'
            ' k  l  m  m  m  n  o'
            ' p  q  r  s  t  u  v'
            ' w  x  y  y  y  z aa'
            'ab ab ab ab ab ab ab'
          `,
        gridTemplateRows: '5rem 5rem 15rem 5rem 15rem 1fr 5rem 10rem',
        gridTemplateColumns: '5rem 5rem 10rem 1fr 10rem 5rem 5rem',
      }}
    >
      <div style={{ gridArea: 'a' }} />

      <div style={{ gridArea: 'b' }} />
      <div style={{ gridArea: 'c', background: printerColor }} />
      <div style={{ gridArea: 'd' }} />

      <div style={{ gridArea: 'e' }} />
      <div style={{ gridArea: 'f', background: printerColor }} />
      <div style={{ gridArea: 'g' }} />
      <div style={{ gridArea: 'h', background: printerColor }} />
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
          3D EasyLapse
        </h1>
      </div>
    </div>
  );
}

export default App;
