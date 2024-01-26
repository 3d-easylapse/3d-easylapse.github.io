export interface TimelapseSettings {
  readonly bedLength: number;
  readonly pauseLengthMs: number;
  readonly enableCustomReturnSpeed: boolean;
  readonly returnSpeedMmPerMin: number;
  readonly enableRetraction: boolean;
  readonly retractionDistanceMm: number;
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

          const next_layer = data[layerIndex + 1];
          const [x, y] = this.getNextXY(next_layer);

          let gcode_to_append = '';

          gcode_to_append += ';CustomTimelapse Begin\n';

          if (props.displayPhotoNumber) {
            gcode_to_append += 'M117 Taking photo ' + layerIndex + '...\n';
          }

          gcode_to_append += '; STEP 1 : retraction\n';
          gcode_to_append +=
            'M83' +
            ' ; switch to relative E values for any needed retraction\n';
          if (props.enableRetraction) {
            gcode_to_append += `G1 F1800 E${-props.retractionDistanceMm};Retraction\n`;
          }
          gcode_to_append += 'M82;Switch back to absolute E values\n';

          gcode_to_append += '; STEP 2 : Move the head up a bit\n';
          gcode_to_append += 'G91;Switch to relative positioning\n';
          gcode_to_append += 'G0 Z1;Move Z axis up a bit\n';
          gcode_to_append += 'G90;Switch back to absolute positioning\n';

          gcode_to_append +=
            '; STEP 3 : Move the head to "display" position and wait\n';
          gcode_to_append += `G0 X0 Y${
            props.bedLength / 2
          };GCODE for the display position\n`;
          gcode_to_append += 'M400;Wait for moves to finish\n';
          gcode_to_append += `G4 P${props.pauseLengthMs};Wait for camera\n`;

          gcode_to_append += '; STEP 4 : send photo trigger command if set\n';
          if (props.sendPhotoCommand) {
            gcode_to_append += props.triggerCommand + ' ;Snap Photo\n';
          }

          gcode_to_append +=
            '; STEP 5 : Move the head back in its original place\n';
          if (props.enableCustomReturnSpeed) {
            gcode_to_append += `G0 X${x} Y${y} F${props.returnSpeedMmPerMin}\n`;
          } else {
            gcode_to_append += `G0 X${x} Y${y}\n`;
          }

          gcode_to_append += '; STEP 6 : Move the head height back down\n';
          gcode_to_append += 'G91;Switch to relative positioning\n';
          gcode_to_append += 'G0 Z-1;Restore Z axis position\n';
          gcode_to_append += 'G90;Switch back to absolute positioning\n';

          gcode_to_append += ';CustomTimelapse End\n';

          layer += gcode_to_append;
          data[index] = layer;
          break;
        }
      }
    });

    return data.join('\n');
  }
}
