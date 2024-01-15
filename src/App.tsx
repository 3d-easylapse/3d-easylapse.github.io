import React, { ChangeEvent } from 'react';
import CustomTimelapse from './CustomTimelapse';

function App() {
  const [steps, setSteps] = React.useState(1);
  const [file, setFile] = React.useState<File>();

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files![0]);
  };

  const handleDownload = async () => {
    if (file) {
      const gcode = await file.text();
      const modifiedGcode = new CustomTimelapse().execute(gcode);
      const blob = new Blob([modifiedGcode], { type: 'plain/text' });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'modified_file.gcode');
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    }
  };

  return (
    <div>
      <label htmlFor="points">Steps:</label>
      <input
        type="number"
        id="points"
        name="points"
        value={steps}
        min={1}
        onChange={(x) => {
          setSteps(parseInt(x.target.value));
        }}
      />
      <input type="file" onChange={handleFileUpload} />
      <button onClick={handleDownload} disabled={!file}>
        Download Modified File
      </button>
    </div>
  );
}

export default App;
