import React, { ChangeEvent, MouseEvent } from 'react';
import { CustomTimelapse, TimelapseSettings } from './CustomTimelapse';

function Form() {
  const timelapseSettingsKey = 'timelapse-settings';

  const timelapseSettingsDefault: TimelapseSettings = {
    displayTime: 5000,
    displayPosX: 110,
    displayPosY: 220,

    retractionAmmount: 5,
    retractionSpeedIn: 2100,
    retractionSpeedOut: 3000,
  };

  const [file, setFile] = React.useState<File>();

  const [timelapseSettings, _setTimelapseSettings] =
    React.useState<TimelapseSettings>(
      JSON.parse(localStorage.getItem(timelapseSettingsKey) ?? 'null') ??
        timelapseSettingsDefault,
    );

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files![0]);
  };

  const setTimelapseSettings = (timelapseSettings: TimelapseSettings) => {
    _setTimelapseSettings(timelapseSettings);
    localStorage.setItem(
      timelapseSettingsKey,
      JSON.stringify(timelapseSettings),
    );
  };

  const handleDownload = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

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
      link.setAttribute('download', `3DEasyLapse_${file.name}`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    }
  };

  return (
    <form>
      <fieldset>
        <legend>G-code file</legend>
        <p>
          <input type="file" onChange={handleFileUpload} />
        </p>
      </fieldset>
      <fieldset>
        <legend>Display</legend>
        <p>
          <label>
            Time:{' '}
            <input
              type="number"
              value={timelapseSettings.displayTime}
              onChange={(el) => {
                setTimelapseSettings({
                  ...timelapseSettings,
                  displayTime: el.target.valueAsNumber,
                });
              }}
            />{' '}
            ms
          </label>
        </p>
        <p>
          <label>
            Position X:{' '}
            <input
              type="number"
              value={timelapseSettings.displayPosX}
              onChange={(el) => {
                setTimelapseSettings({
                  ...timelapseSettings,
                  displayPosX: el.target.valueAsNumber,
                });
              }}
            />
          </label>{' '}
          <label>
            Y:{' '}
            <input
              type="number"
              value={timelapseSettings.displayPosY}
              onChange={(el) => {
                setTimelapseSettings({
                  ...timelapseSettings,
                  displayPosY: el.target.valueAsNumber,
                });
              }}
            />{' '}
            mm
          </label>
        </p>
      </fieldset>
      <fieldset>
        <legend>Retraction</legend>
        <p>
          <label>
            Ammount:{' '}
            <input
              type="number"
              value={timelapseSettings.retractionAmmount}
              min={0}
              onChange={(el) => {
                setTimelapseSettings({
                  ...timelapseSettings,
                  retractionAmmount: el.target.valueAsNumber,
                });
              }}
            />{' '}
            mm
          </label>
        </p>
        <p>
          <label>
            Speed in:{' '}
            <input
              type="number"
              value={timelapseSettings.retractionSpeedIn}
              min={0}
              onChange={(el) => {
                setTimelapseSettings({
                  ...timelapseSettings,
                  retractionSpeedIn: el.target.valueAsNumber,
                });
              }}
            />
          </label>{' '}
          <label>
            out:{' '}
            <input
              type="number"
              value={timelapseSettings.retractionSpeedOut}
              min={0}
              onChange={(el) => {
                setTimelapseSettings({
                  ...timelapseSettings,
                  retractionSpeedOut: el.target.valueAsNumber,
                });
              }}
            />{' '}
            mm/min
          </label>
        </p>
      </fieldset>
      <p>
        <input
          type="reset"
          onClick={() => {
            if (window.confirm('Are you sure you wanna reset the fields?')) {
              setTimelapseSettings(timelapseSettingsDefault);
            }
          }}
        ></input>{' '}
        <button onClick={handleDownload} disabled={!file}>
          Download Modified File
        </button>
      </p>
    </form>
  );
}

export default Form;
