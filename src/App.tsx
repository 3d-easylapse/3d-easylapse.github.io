import React from 'react';
import Form from './Form';

function App() {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    document.addEventListener('mousemove', function (e) {
      if (ref.current === null) {
        return;
      }

      let left = e.pageX;
      ref.current.style.left =
        Math.min(Math.max(left, 350), document.body.clientWidth - 350) + 'px';
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
        <div style={{ gridArea: 'a', background: 'lightgray' }} />
        <div style={{ gridArea: 'b', background: 'black' }} />
        <div style={{ gridArea: 'c', background: 'lightgray' }} />
        <div style={{ gridArea: 'd', background: 'black' }} />
        <div style={{ gridArea: 'e', background: 'lightgray' }} />

        <div style={{ gridArea: 'f', background: 'black' }} />

        <div style={{ gridArea: 'g', background: 'lightgray' }} />
        <div style={{ gridArea: 'h', background: 'black' }} />
        <div style={{ gridArea: 'i', background: 'lightgray' }} />
        <div style={{ gridArea: 'j', background: 'black' }} />
        <div style={{ gridArea: 'k', background: 'lightgray' }} />

        <div
          ref={ref}
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
        <div style={{ gridArea: 'a', background: 'lightgray' }} />
        <div style={{ gridArea: 'b', background: 'black' }} />
        <div style={{ gridArea: 'c', background: 'lightgray' }} />
        <div style={{ gridArea: 'd' }}>
          <Form />
        </div>
        <div style={{ gridArea: 'e', background: 'lightgray' }} />
        <div style={{ gridArea: 'f', background: 'black' }} />
        <div style={{ gridArea: 'g', background: 'lightgray' }} />

        <div style={{ gridArea: 'h', background: 'lightgray' }} />
        <div style={{ gridArea: 'i', background: 'black' }} />
        <div style={{ gridArea: 'j', background: 'lightgray' }} />
        <div style={{ gridArea: 'k', background: 'black' }} />
        <div style={{ gridArea: 'l', background: 'lightgray' }} />
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: '200px',
          gridTemplateColumns: '1fr',
        }}
      >
        <div style={{ background: 'black' }} />
      </div>
    </>
  );
}

export default App;
