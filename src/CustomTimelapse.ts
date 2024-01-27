export interface TimelapseSettings {
  readonly yDisplayPos: number;
  readonly pauseLengthMs: number;
  readonly enableCustomReturnSpeed: boolean;
  readonly returnSpeedMmPerMin: number;
  readonly enableRetraction: boolean;
  readonly retractionDistanceMm: number;
  readonly retractionSpeedMmPerMin: number;
  readonly displayPhotoNumber: boolean;
  readonly sendPhotoCommand: boolean;
  readonly triggerCommand: string;
}

/**
 * This code was translated from github.com/simonjamain/CustomTimelapseCuraPlugin
 */
export class CustomTimelapse {
  /**
   * From https://github.com/Ultimaker/Cura/blob/0fe682470a53ea22c6f617d17f13e23fe49d8f57/scripts/line_length_checker.py#L4C1-L4C5
   */
  getValue(line: string, key: string): number | undefined {
    if (
      !line.includes(key) ||
      (line.includes(';') && line.indexOf(key) > line.indexOf(';'))
    ) {
      return undefined;
    }
    const subPart = line.substring(line.indexOf(key) + 1);
    const match = subPart.match(/^-?[0-9]+\.?[0-9]*/);
    if (match === null) {
      return undefined;
    }
    const matchedString = match[0];
    let value: number;
    try {
      value = parseInt(matchedString);
    } catch (e) {
      try {
        value = parseFloat(matchedString);
      } catch (e) {
        return undefined;
      }
    }
    return isNaN(value) ? undefined : value;
  }

  getNextXY(layer: string) {
    const lines = layer.split('\n');
    for (const line of lines) {
      const x = this.getValue(line, 'X');
      const y = this.getValue(line, 'Y');

      if (x && y) {
        return [x, y];
      }
    }

    return [0, 0];
  }

  gcodeToLayers(gcode: string) {
    const layers: string[][] = [];

    const lines = gcode.split('\n');
    for (const line of lines) {
      if (layers.length === 0 || line.includes(';LAYER:')) {
        layers.push([]);
      }

      layers[layers.length - 1].push(line);
    }

    return layers.map((layer) => layer.join('\n'));
  }

  execute(gcode: string, props: TimelapseSettings) {
    const data = this.gcodeToLayers(gcode);

    data.forEach((layer, layerIndex) => {
      if (layerIndex === data.length - 1) {
        return;
      }

      const lines = layer.split('\n');

      for (const line of lines) {
        if (line.includes(';LAYER:')) {
          const index = data.indexOf(layer);

          const nextLayer = data[layerIndex + 1];
          const [x, y] = this.getNextXY(nextLayer);

          let toAppend = '';

          toAppend += '; CustomTimelapse Begin\n';

          toAppend += 'G91; Relative movement for retraction\n';
          toAppend += 'G0 E-5 F3000; Retract -5mm at 3000mm/min\n';
          toAppend += `G0 Z1 ; Move Z axis up a bit\n`;
          toAppend += 'G90; Absolute Positioning\n';
          toAppend += 'G0 F9000 X110 Y200; Display position\n';
          toAppend += 'G4 S2; Wait 2 seconds\n';
          toAppend += `G0 F9000 X${x} Y${y}; Next position\n`;
          toAppend += 'G91; Relative again for un-retraction\n';
          toAppend += 'G0 E5 F2100; Un-Retract 5mm at 2100mm/min\n';
          toAppend += `G0 Z-1; Move Z axis down a bit\n`;
          toAppend += 'G90; Back to Absolute\n';

          toAppend += '; CustomTimelapse End\n';

          layer += toAppend;
          data[index] = layer;
          break;
        }
      }
    });

    return data.join('\n');
  }
}
