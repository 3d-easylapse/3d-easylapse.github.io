import React, { ChangeEvent } from 'react';
import { CustomTimelapse, TimelapseSettings } from './CustomTimelapse';

function App() {
  const timelapseSettingsKey = 'timelapse-settings';

  const [timelapseSettings, _setTimelapseSettings] =
    React.useState<TimelapseSettings>(
      JSON.parse(localStorage.getItem(timelapseSettingsKey) ?? 'null') ?? {
        bedLength: 220,

        pauseLengthMs: 5000,

        enableCustomReturnSpeed: false,
        returnSpeedMmPerMin: 1500,

        enableRetraction: true,
        retractionDistanceMm: 5,

        displayPhotoNumber: false,

        sendPhotoCommand: false,
        triggerCommand: 'M240',
      },
    );

  const setTimelapseSettings = (timelapseSettings: TimelapseSettings) => {
    _setTimelapseSettings(timelapseSettings);
    localStorage.setItem(
      timelapseSettingsKey,
      JSON.stringify(timelapseSettings),
    );
  };

  const [file, setFile] = React.useState<File>();

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files![0]);
  };

  const handleDownload = async () => {
    if (file) {
      const gcode = await file.text();
      const modifiedGcode = new CustomTimelapse().execute(
        gcode,
        timelapseSettings,
      );
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
      <label htmlFor="bed-length">Bed length (mm): </label>
      <input
        type="number"
        id="bed-length"
        value={timelapseSettings.bedLength}
        min={1}
        onChange={(el) => {
          setTimelapseSettings({
            ...timelapseSettings,
            bedLength: el.target.valueAsNumber,
          });
        }}
      />

      <br />

      <label htmlFor="pause-length">Pause length (ms): </label>
      <input
        type="number"
        id="pause-length"
        value={timelapseSettings.pauseLengthMs}
        min={1}
        onChange={(el) => {
          setTimelapseSettings({
            ...timelapseSettings,
            pauseLengthMs: el.target.valueAsNumber,
          });
        }}
      />

      <br />

      <label htmlFor="enable-custom-return-speed">
        Enable custom return speed:{' '}
      </label>
      <input
        type="checkbox"
        id="enable-custom-return-speed"
        checked={timelapseSettings.enableCustomReturnSpeed}
        onChange={(el) => {
          setTimelapseSettings({
            ...timelapseSettings,
            enableCustomReturnSpeed: el.target.checked,
          });
        }}
      />

      <label htmlFor="return-speed">Return speed (mm/min): </label>
      <input
        disabled={!timelapseSettings.enableCustomReturnSpeed}
        type="number"
        id="return-speed"
        value={timelapseSettings.returnSpeedMmPerMin}
        onChange={(el) => {
          setTimelapseSettings({
            ...timelapseSettings,
            returnSpeedMmPerMin: el.target.valueAsNumber,
          });
        }}
      />

      <br />

      <label htmlFor="enable-retraction">Enable retraction: </label>
      <input
        type="checkbox"
        id="enable-retraction"
        checked={timelapseSettings.enableRetraction}
        onChange={(el) => {
          setTimelapseSettings({
            ...timelapseSettings,
            enableRetraction: el.target.checked,
          });
        }}
      />

      <label htmlFor="retraction-distance">Retraction distance (mm): </label>
      <input
        disabled={!timelapseSettings.enableRetraction}
        type="number"
        id="retraction-distance"
        value={timelapseSettings.retractionDistanceMm}
        onChange={(el) => {
          setTimelapseSettings({
            ...timelapseSettings,
            retractionDistanceMm: el.target.valueAsNumber,
          });
        }}
      />

      <br />

      <label htmlFor="display-photo-number">Display photo number: </label>
      <input
        type="checkbox"
        id="display-photo-number"
        checked={timelapseSettings.displayPhotoNumber}
        onChange={(el) => {
          setTimelapseSettings({
            ...timelapseSettings,
            displayPhotoNumber: el.target.checked,
          });
        }}
      />

      <br />

      <label htmlFor="send-photo-command">Send photo command: </label>
      <input
        type="checkbox"
        id="send-photo-command"
        checked={timelapseSettings.sendPhotoCommand}
        onChange={(el) => {
          setTimelapseSettings({
            ...timelapseSettings,
            sendPhotoCommand: el.target.checked,
          });
        }}
      />

      <label htmlFor="trigger-command">Trigger command: </label>
      <input
        disabled={!timelapseSettings.sendPhotoCommand}
        type="text"
        id="trigger-command"
        value={timelapseSettings.triggerCommand}
        onChange={(el) => {
          setTimelapseSettings({
            ...timelapseSettings,
            triggerCommand: el.target.value,
          });
        }}
      />

      <br />

      <button
        onClick={() => {
          if (window.confirm('Are you sure you wanna reset the fields?')) {
            localStorage.removeItem(timelapseSettingsKey);
            window.location.reload();
          }
        }}
      >
        Reset fields
      </button>
      <input type="file" onChange={handleFileUpload} />
      <button onClick={handleDownload} disabled={!file}>
        Download Modified File
      </button>
    </div>
  );
}

export default App;
