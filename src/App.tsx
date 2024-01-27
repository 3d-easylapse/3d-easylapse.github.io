import React from 'react';
import Form from './Form';

function App() {
  const extruderRef = React.useRef<HTMLDivElement>(null);
  const extruderShadowRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    document.addEventListener('mousemove', function (e) {
      if (extruderRef.current === null) {
        return;
      }

      const left = e.pageX;
      extruderRef.current.style.left =
        Math.min(Math.max(left, 350), document.body.clientWidth - 350) + 'px';
      setTimeout(() => {
        if (extruderShadowRef.current === null) {
          return;
        }

        extruderShadowRef.current.style.left =
          Math.min(Math.max(left, 350), document.body.clientWidth - 350) + 'px';
      }, 50);
    });
  }, []);

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateAreas: `
            'a b c d e'
            'f f f f f'
            'g h i j k'
          `,
          gridTemplateRows: '100px 100px 200px',
          gridTemplateColumns: '100px 100px 1fr 100px 100px',
        }}
      >
        <div style={{ gridArea: 'a' }} />
        <div style={{ gridArea: 'b', background: '#3c3c3c' }} />
        <div style={{ gridArea: 'c' }} />
        <div style={{ gridArea: 'd', background: '#3c3c3c' }} />
        <div style={{ gridArea: 'e' }} />

        <div style={{ gridArea: 'f', background: '#3c3c3c' }} />

        <div style={{ gridArea: 'g' }} />
        <div style={{ gridArea: 'h', background: '#3c3c3c' }} />
        <div style={{ gridArea: 'i' }} />
        <div style={{ gridArea: 'j', background: '#3c3c3c' }} />
        <div style={{ gridArea: 'k' }} />

        <div
          ref={extruderShadowRef}
          style={{
            display: 'grid',
            position: 'absolute',
            gridTemplateAreas: `
              'a a a'
              'b c d'
            `,
            gridTemplateRows: '300px 100px',
            gridTemplateColumns: '100px 100px 100px',
            transform: 'translate(-50%, 0)',
          }}
        >
          <div style={{ gridArea: 'a', background: 'lime' }} />
          <div style={{ gridArea: 'b' }} />
          <div style={{ gridArea: 'c', background: 'lime' }} />
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
            gridTemplateRows: '300px 100px',
            gridTemplateColumns: '100px 100px 100px',
            transform: 'translate(-50%, 0)',
          }}
        >
          <div style={{ gridArea: 'a', background: 'grey' }} />
          <div style={{ gridArea: 'b' }} />
          <div style={{ gridArea: 'c', background: 'grey' }} />
          <div style={{ gridArea: 'd' }} />

          <h1
            style={{
              position: 'absolute',
              margin: 0,
              left: '150px',
              top: '150px',
              transform: 'translate(-50%, -50%)',
              whiteSpace: 'nowrap',
            }}
          >
            3D EasyLapse
          </h1>
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateAreas: `
            'a b c d e f g'
            'h i j j j k l'
          `,
          gridTemplateRows: '1fr 100px',
          gridTemplateColumns: '100px 100px 300px 1fr 300px 100px 100px',
        }}
      >
        <div style={{ gridArea: 'a' }} />
        <div style={{ gridArea: 'b', background: '#3c3c3c' }} />
        <div style={{ gridArea: 'c' }} />
        <div style={{ gridArea: 'd' }}>
          <Form />
        </div>
        <div style={{ gridArea: 'e' }} />
        <div style={{ gridArea: 'f', background: '#3c3c3c' }} />
        <div style={{ gridArea: 'g' }} />

        <div style={{ gridArea: 'h' }} />
        <div style={{ gridArea: 'i', background: '#3c3c3c' }} />
        <div style={{ gridArea: 'j' }} />
        <div style={{ gridArea: 'k', background: '#3c3c3c' }} />
        <div style={{ gridArea: 'l' }} />
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: '200px',
          gridTemplateColumns: '1fr',
        }}
      >
        <div style={{ background: '#3c3c3c' }} />
      </div>
    </>
  );
}

export default App;
