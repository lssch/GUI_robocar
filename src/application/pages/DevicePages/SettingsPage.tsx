import React, {useCallback} from 'react'
import { RouteComponentProps } from '@reach/router'
import {Button, ButtonGroup, Callout, Card, Divider, Icon, Intent,} from '@blueprintjs/core'
import {Box, Composition} from 'atomic-layout'
import {IconNames} from "@blueprintjs/icons";
import {AlphaSlider, HueSlider, Printer} from "@electricui/components-desktop";
import {Dropdown, NumberInput, SaveButton, Switch} from "@electricui/components-desktop-blueprint";
import {
  SaveContainer,
  useDeadline,
  useHardwareState,
  useSaveContainer,
  useWriteState
} from "@electricui/components-core";
import {HelpPopover} from "../../HelpPopover";
import {MSGID} from "../../typedState";
import {IMU_GYRO_MAX_DPS, IMU_ACCEL_MAX_G} from "../../types/parameter";

const layoutDescription = `
  Save
  Car 
  Imu
  Vfs
  Servo
  Navlight
  Odometry
  Operatingmode
`

const MaxGSwitcher = () => {
  const parameter = useHardwareState(MSGID.PARAMETER)
  const writeState = useWriteState()
  const getDeadline = useDeadline()

  const changeValue = useCallback(
    (value) => {
      const cancellationToken = getDeadline()
      writeState(
        state => {
          state.parameter.imu.accel_max_g = value
        },
        true,
        cancellationToken
      )
    },
    [],
  )

  return (
    <ButtonGroup fill>
      <Button disabled={parameter.imu.accel_max_g == IMU_ACCEL_MAX_G.PM_4G}
              onClick={() => changeValue(IMU_ACCEL_MAX_G.PM_4G)}>
        {IMU_ACCEL_MAX_G.PM_4G}
      </Button>
      <Button disabled={parameter.imu.accel_max_g == IMU_ACCEL_MAX_G.PM_8G}
              onClick={() => changeValue(IMU_ACCEL_MAX_G.PM_8G)}>
        {IMU_ACCEL_MAX_G.PM_8G}
      </Button>
      <Button disabled={parameter.imu.accel_max_g == IMU_ACCEL_MAX_G.PM_16G}
              onClick={() => changeValue(IMU_ACCEL_MAX_G.PM_16G)}>
        {IMU_ACCEL_MAX_G.PM_16G}
      </Button>
    </ButtonGroup>
  )
}

const MaxDpsSwitcher = () => {
  const parameter = useHardwareState(MSGID.PARAMETER)
  const writeState = useWriteState()
  const getDeadline = useDeadline()

  const changeValue = useCallback(
    (value) => {
      const cancellationToken = getDeadline()
      writeState(
        state => {
          state.parameter.imu.gyro_max_dps = value
        },
        true,
        cancellationToken
      )
    },
    [],
  )

  return (
    <ButtonGroup fill>
      <Button disabled={parameter.imu.gyro_max_dps == IMU_GYRO_MAX_DPS.PM_250_DPS}
              onClick={() => changeValue(IMU_GYRO_MAX_DPS.PM_250_DPS)}>
        {IMU_GYRO_MAX_DPS.PM_250_DPS}
      </Button>
      <Button disabled={parameter.imu.gyro_max_dps == IMU_GYRO_MAX_DPS.PM_500_DPS}
              onClick={() => changeValue(IMU_GYRO_MAX_DPS.PM_500_DPS)}>
        {IMU_GYRO_MAX_DPS.PM_500_DPS}
      </Button>
      <Button disabled={parameter.imu.gyro_max_dps == IMU_GYRO_MAX_DPS.PM_1000_DPS}
              onClick={() => changeValue(IMU_GYRO_MAX_DPS.PM_1000_DPS)}>
        {IMU_GYRO_MAX_DPS.PM_1000_DPS}
      </Button>
      <Button disabled={parameter.imu.gyro_max_dps == IMU_GYRO_MAX_DPS.PM_2000_DPS}
                         onClick={() => changeValue(IMU_GYRO_MAX_DPS.PM_2000_DPS)}>
        {IMU_GYRO_MAX_DPS.PM_2000_DPS}
      </Button>
    </ButtonGroup>
  )
}

function SaveContainerControls() {
  const { save, reset, dirty } = useSaveContainer()
  const writeState = useWriteState()

  const getDeadline = useDeadline()

  const onClickSave = useCallback(
    () => {
      const cancellationToken = getDeadline()
      writeState(
        state => {
          state.request.safe_parameters = 1
        },
        true,
        cancellationToken
      )
      save(cancellationToken)
    },
    [],
  )

  return (
    <ButtonGroup>
      <Button intent="danger" large onClick={onClickSave} disabled={!dirty}>Save</Button>
      <Button intent="primary" large onClick={reset} disabled={!dirty}>Cancel </Button>
    </ButtonGroup>
  )
}

const Save = () => {
  return (
    <Callout title="Flash parameters" intent={Intent.WARNING} style={{ textAlign: 'center'}}>
      <Composition gap={10} templateCols="3fr 1fr">
        <Box style={{ textAlign: 'left'}}>
          <b>Caution</b> All parameters will be overwritten without further checks!
        </Box>
        <Box>
          <SaveContainerControls/>
        </Box>
      </Composition>
    </Callout>
  )
}

const Car = () => {
  return (
    <Callout title="RC-Car" icon={IconNames.BUGGY} style={{ textAlign: 'center'}}>
      <Composition gap={10} templateCols="1fr auto auto auto" style={{ textAlign: 'left'}}>
        <Box>Length</Box>
        <Box>
          <NumberInput
            accessor={state => state.parameter.car.chassis_length}
            writer={(state, value) => {
              state.parameter.car.chassis_length = value
            }}
            min={0}
            max={255}
            throttleDuration={500}/>
        </Box>
        <Box>mm</Box>
        <Box>
          <HelpPopover title="RC car length">
            The over all car length.
          </HelpPopover>
        </Box>

        <Box>Width</Box>
        <Box>
          <NumberInput
            accessor={state => state.parameter.car.chassis_width}
            writer={(state, value) => {
              state.parameter.car.chassis_width = value
            }}
            min={0}
            max={255}
            throttleDuration={500}/>
        </Box>
        <Box>mm</Box>
        <Box>
          <HelpPopover title="Resolution">
            The amplifier supports two gain settings:
            <ul>
              <li>a fast 12-bit mode,</li>
              <li>and a slower 16-bit mode.</li>
            </ul>
            Use of the high resolution mode limits the sampling rate to 2kHz.
          </HelpPopover>
        </Box>

        <Box>Wheel diameter</Box>
        <Box>
          <NumberInput
            accessor={state => state.parameter.car.wheel_diameter}
            writer={(state, value) => {
              state.parameter.car.wheel_diameter = value
            }}
            min={0}
            max={255}
            throttleDuration={500}/>
        </Box>
        <Box>mm</Box>
        <Box>
          <HelpPopover title="Resolution">
            The amplifier supports two gain settings:
            <ul>
              <li>a fast 12-bit mode,</li>
              <li>and a slower 16-bit mode.</li>
            </ul>
            Use of the high resolution mode limits the sampling rate to 2kHz.
          </HelpPopover>
        </Box>
      </Composition>
    </Callout>
  )
}

const Imu = () => {
  return (
    <Callout title="IMU - BMU6080" icon={IconNames.FLAME} style={{ textAlign: 'center'}}>
      <Composition gap={10} templateCols="1fr auto auto auto" style={{ textAlign: 'left'}}>
        <Box>Max DPS</Box>
        <Box>
          <MaxDpsSwitcher/>
        </Box>
        <Box></Box>
        <Box>
          <HelpPopover title="Resolution">
            The amplifier supports two gain settings:
            <ul>
              <li>a fast 12-bit mode,</li>
              <li>and a slower 16-bit mode.</li>
            </ul>
            Use of the high resolution mode limits the sampling rate to 2kHz.
          </HelpPopover>
        </Box>

        <Box>Samplerate divisor</Box>
        <Box>
          <NumberInput
            accessor={state => state.parameter.imu.gyro_samplerate_divisor}
            writer={(state, value) => {
              state.parameter.imu.gyro_samplerate_divisor = value
            }}
            min={0}
            max={255}
            throttleDuration={500}/>
        </Box>
        <Box></Box>
        <Box>
          <HelpPopover title="Resolution">
            The amplifier supports two gain settings:
            <ul>
              <li>a fast 12-bit mode,</li>
              <li>and a slower 16-bit mode.</li>
            </ul>
            Use of the high resolution mode limits the sampling rate to 2kHz.
          </HelpPopover>
        </Box>

        <Box>Max G</Box>
        <Box>
          <MaxGSwitcher/>
        </Box>
        <Box></Box>
        <Box>
          <HelpPopover title="Resolution">
            The amplifier supports two gain settings:
            <ul>
              <li>a fast 12-bit mode,</li>
              <li>and a slower 16-bit mode.</li>
            </ul>
            Use of the high resolution mode limits the sampling rate to 2kHz.
          </HelpPopover>
        </Box>

        <Box>Calibration samples</Box>
        <Box>
          <NumberInput
            accessor={state => state.parameter.imu.gyro_calibration_samples}
            writer={(state, value) => {
              state.parameter.imu.gyro_calibration_samples = value
            }}
            min={0}
            max={255}
            throttleDuration={500}/>
        </Box>
        <Box></Box>
        <Box>
          <HelpPopover title="Resolution">
            The amplifier supports two gain settings:
            <ul>
              <li>a fast 12-bit mode,</li>
              <li>and a slower 16-bit mode.</li>
            </ul>
            Use of the high resolution mode limits the sampling rate to 2kHz.
          </HelpPopover>
        </Box>
      </Composition>
    </Callout>
  )
}

const Vfs = () => {
  return (
    <Callout title="VFS - ADNS3080" icon={IconNames.FLAME} style={{ textAlign: 'center'}}>
      <Composition gap={10} templateCols="1fr auto auto auto" style={{ textAlign: 'left'}}>
        <Box>Distance to above ground</Box>
        <Box>
          <NumberInput
            accessor={state => state.parameter.vfs.height}
            writer={(state, value) => {
              state.parameter.vfs.height = value
            }}
            min={0}
            max={255}
            throttleDuration={500}/>
        </Box>
        <Box>mm</Box>
        <Box>
          <HelpPopover title="Distance">
            The distance between the lens and the floor.
          </HelpPopover>
        </Box>

        <Box>Distance to above ground</Box>
        <Box>
          <NumberInput
            accessor={state => state.parameter.vfs.measured_target_length}
            writer={(state, value) => {
              state.parameter.vfs.measured_target_length = value
            }}
            min={0}
            max={255}
            throttleDuration={500}/>
        </Box>
        <Box>mm</Box>
        <Box>
          <HelpPopover title="Distance">
            The distance between the lens and the floor.
          </HelpPopover>
        </Box>

        <Box>Led shutter</Box>
        <Box>
          <Switch
            unchecked={0}
            checked={1}
            large
            accessor={state => state.parameter.vfs.led_shutter}
            writer={(state, value) => {
              state.parameter.vfs.led_shutter = value
            }}
            innerLabel="off"
            innerLabelChecked="on"
          /></Box>
        <Box></Box>
        <Box></Box>

        <Box>High resolution</Box>
        <Box>
          <Switch
            unchecked={0}
            checked={1}
            large
            accessor={state => state.parameter.vfs.high_resolution}
            writer={(state, value) => {
              state.parameter.vfs.high_resolution = value
            }}
            innerLabel="off"
            innerLabelChecked="on"
          /></Box>
        <Box></Box>
        <Box></Box>

        <Box>Floor light color</Box>
        <Box>
          <HueSlider
            red={state => state.parameter.vfs.light_color.red}
            green={state => state.parameter.vfs.light_color.green}
            blue={state => state.parameter.vfs.light_color.blue}
            writer={(state, color) => {
              state.parameter.vfs.light_color.red = color.r
              state.parameter.vfs.light_color.green = color.g
              state.parameter.vfs.light_color.blue = color.b
            }}
          />
        </Box>
        <Box></Box>
        <Box></Box>

        <Box>Floor light brightness</Box>
        <Box>
          <AlphaSlider
            red={state => state.parameter.vfs.light_color.red}
            green={state => state.parameter.vfs.light_color.green}
            blue={state => state.parameter.vfs.light_color.blue}
            alpha={state => 255 - state.parameter.vfs.light_color.alpha}
            writer={(state, color) => {
              state.parameter.vfs.light_color.red = color.r
              state.parameter.vfs.light_color.green = color.g
              state.parameter.vfs.light_color.blue = color.b
              // @ts-ignore
              state.parameter.vfs.light_color.alpha = 255 - color.a
            }}
          />
        </Box>
        <Box></Box>
        <Box></Box>
      </Composition>
    </Callout>
  )
}

const Servo = () => {
  return (
    <Callout title="Servo - MG90" icon={IconNames.BUGGY} style={{ textAlign: 'center'}}>
      <Composition gap={10} templateCols="1fr auto auto auto" style={{ textAlign: 'left'}}>
        <Box>Zero position offset</Box>
        <Box>
          <NumberInput
            accessor={state => state.parameter.servo.zero_position}
            writer={(state, value) => {
              state.parameter.servo.zero_position = value
            }}
            min={-32000}
            max={32000}
            throttleDuration={500}/>
        </Box>
        <Box>cdeg</Box>
        <Box>
          <HelpPopover title="Offset correction">
            To correct the zero position if the car doesn't drive straight.
          </HelpPopover>
        </Box>

        <Box>Max steering angle</Box>
        <Box>
          <NumberInput
            accessor={state => state.parameter.servo.max_steering_angle}
            writer={(state, value) => {
              state.parameter.servo.max_steering_angle = value
            }}
            min={-32000}
            max={32000}
            throttleDuration={500}/>
        </Box>
        <Box>cdeg</Box>
        <Box>
          <HelpPopover title="Servo limits">
            Mechanical limits of the servo. On most servos this is ±60°.
          </HelpPopover>
        </Box>

        <Box>Steering limits</Box>
        <Box>
          <NumberInput
            accessor={state => state.parameter.servo.steering_limits}
            writer={(state, value) => {
              state.parameter.servo.steering_limits = value
            }}
            min={-32000}
            max={32000}
            throttleDuration={500}/>
        </Box>
        <Box>cdeg</Box>
        <Box>
          <HelpPopover title="Mechanical limits">
            The maximum rotating angle so that the wheels doesn't collide with the cassis.
          </HelpPopover>
        </Box>
      </Composition>
    </Callout>
  )
}

const Navlight = () => {
  return (
    <Callout title="Navlight - Neopixels" icon={IconNames.FLAME} style={{ textAlign: 'center'}}>
      <Composition gap={10} templateCols="1fr auto auto auto" style={{ textAlign: 'left', align: 'right'}}>
        <Box>Blinker color</Box>
        <Box>
          <HueSlider
            red={state => state.parameter.navlight.color_blinker.red}
            green={state => state.parameter.navlight.color_blinker.green}
            blue={state => state.parameter.navlight.color_blinker.blue}
            writer={(state, color) => {
              state.parameter.navlight.color_blinker = color
            }}
          />
        </Box>
        <Box></Box>
        <Box></Box>

        <Box>Blinker brightness</Box>
        <Box>
          <AlphaSlider
            red="r"
            green="g"
            blue="b"
            alpha={state => state.parameter.navlight.color_blinker.alpha}
            writer={(state, color) => {
              state.parameter.navlight.color_blinker.alpha = color.a
            }}
          />
        </Box>
        <Box></Box>
        <Box></Box>
        
        <Box>Front facing light color</Box>
        <Box>
          <HueSlider
            red={state => state.parameter.navlight.color_front.red}
            green={state => state.parameter.navlight.color_front.green}
            blue={state => state.parameter.navlight.color_front.blue}
            writer={(state, color) => {
              state.parameter.vfs.navlight.color_front = color
            }}
          />
        </Box>
        <Box></Box>
        <Box></Box>

        <Box>Front facing light brightness</Box>
        <Box>
          <AlphaSlider
            red="r"
            green="g"
            blue="b"
            alpha={state => state.parameter.navlight.color_front.alpha}
            writer={(state, color) => {
              state.parameter.navlight.color_front.alpha = color.a
            }}
          />
        </Box>
        <Box></Box>
        <Box></Box>

        <Box>Back facing light color </Box>
        <Box>
          <HueSlider
            red={state => state.parameter.navlight.color_back.red}
            green={state => state.parameter.navlight.color_back.green}
            blue={state => state.parameter.navlight.color_back.blue}
            writer={(state, color) => {
              state.parameter.vfs.navlight.color_back = color
            }}
          />
        </Box>
        <Box></Box>
        <Box></Box>

        <Box>Back facing light brightness</Box>
        <Box>
          <AlphaSlider
            red="r"
            green="g"
            blue="b"
            alpha={state => state.parameter.navlight.color_back.alpha}
            writer={(state, color) => {
              state.parameter.navlight.color_back.alpha = color.a
            }}
          />
        </Box>
        <Box></Box>
        <Box></Box>
      </Composition>
    </Callout>
  )
}

const Odometry = () => {
  return (
    <Callout title="Odometry" icon={IconNames.BUGGY} style={{ textAlign: 'center'}}>
      <Composition gap={10} templateCols="1fr auto auto auto" style={{ textAlign: 'left'}}>
        <Box>Origin to front</Box>
        <Box>x</Box>
        <Box>
          <NumberInput
            accessor={state => state.parameter.odometry.origin_to_front}
            writer={(state, value) => {
              state.parameter.odometry.origin_to_front = value
            }}
            min={-32768}
            max={32767}
            throttleDuration={500}/>
        </Box>
        <Box>mm</Box>

        <Box>Origin to back</Box>
        <Box>x</Box>
        <Box>
          <NumberInput
            accessor={state => state.parameter.odometry.origin_to_back}
            writer={(state, value) => {
              state.parameter.odometry.origin_to_back = value
            }}
            min={-32768}
            max={32767}
            throttleDuration={500}/>
        </Box>
        <Box>mm</Box>
      </Composition>

      <Composition gap={10} templateCols="1fr auto auto auto auto auto auto auto" style={{ textAlign: 'left'}}>
        <Box>IMU link</Box>
        <Box>x</Box>
        <Box>
          <NumberInput
            accessor={state => state.parameter.odometry.imu_link.x}
            writer={(state, value) => {
              state.parameter.odometry.imu_link.x = value
            }}
            min={-128}
            max={127}
            throttleDuration={500}/>
        </Box>
        <Box>y</Box>
        <Box>
          <NumberInput
            accessor={state => state.parameter.odometry.imu_link.y}
            writer={(state, value) => {
              state.parameter.odometry.imu_link.y = value
            }}
            min={-128}
            max={127}
            throttleDuration={500}/>
        </Box>
        <Box>z</Box>
        <Box>
          <NumberInput
            accessor={state => state.parameter.odometry.imu_link.z}
            writer={(state, value) => {
              state.parameter.odometry.imu_link.z = value
            }}
            min={-128}
            max={127}
            throttleDuration={500}/>
        </Box>
        <Box>mm</Box>

        <Box>Tof-spot link</Box>
        <Box>x</Box>
        <Box>
          <NumberInput
            accessor={state => state.parameter.odometry.tof_spot_link.x}
            writer={(state, value) => {
              state.parameter.odometry.tof_spot_link.x = value
            }}
            min={-128}
            max={127}
            throttleDuration={500}/>
        </Box>
        <Box>y</Box>
        <Box>
          <NumberInput
            accessor={state => state.parameter.odometry.tof_spot_link.y}
            writer={(state, value) => {
              state.parameter.odometry.tof_spot_link.y = value
            }}
            min={-128}
            max={127}
            throttleDuration={500}/>
        </Box>
        <Box>z</Box>
        <Box>
          <NumberInput
            accessor={state => state.parameter.odometry.tof_spot_link.z}
            writer={(state, value) => {
              state.parameter.odometry.tof_spot_link.z = value
            }}
            min={-128}
            max={127}
            throttleDuration={500}/>
        </Box>
        <Box>mm</Box>

        <Box>Tof-cam link</Box>
        <Box>x</Box>
        <Box>
          <div>
            <NumberInput
              accessor={state => state.parameter.odometry.tof_cam_link.x}
              writer={(state, value) => {
                state.parameter.odometry.tof_cam_link.x = value
              }}
              min={-128}
              max={127}
              throttleDuration={500}/>
          </div>

        </Box>
        <Box>y</Box>
        <Box>
          <NumberInput
            accessor={state => state.parameter.odometry.tof_cam_link.y}
            writer={(state, value) => {
              state.parameter.odometry.tof_cam_link.y = value
            }}
            min={-128}
            max={127}
            throttleDuration={500}/>
        </Box>
        <Box>z</Box>
        <Box>
          <NumberInput
            accessor={state => state.parameter.odometry.tof_cam_link.z}
            writer={(state, value) => {
              state.parameter.odometry.tof_cam_link.z = value
            }}
            min={-128}
            max={127}
            throttleDuration={500}/>
        </Box>
        <Box>mm</Box>

        <Box>VSF link</Box>
        <Box>x</Box>
        <Box>
          <div>
            <NumberInput
              accessor={state => state.parameter.odometry.vfs_link.x}
              writer={(state, value) => {
                state.parameter.odometry.vfs_link.x = value
              }}
              min={-128}
              max={127}
              throttleDuration={500}/>
          </div>

        </Box>
        <Box>y</Box>
        <Box>
          <NumberInput
            accessor={state => state.parameter.odometry.vfs_link.y}
            writer={(state, value) => {
              state.parameter.odometry.vfs_link.y = value
            }}
            min={-128}
            max={127}
            throttleDuration={500}/>
        </Box>
        <Box>z</Box>
        <Box>
          <NumberInput
            accessor={state => state.parameter.odometry.vfs_link.z}
            writer={(state, value) => {
              state.parameter.odometry.vfs_link.z = value
            }}
            min={-128}
            max={127}
            throttleDuration={500}/>
        </Box>
        <Box>mm</Box>
      </Composition>
    </Callout>
  )
}

const OperatingMode = () => {
  return (
    <Callout title="Operating Modes" icon={IconNames.MENU} style={{ textAlign: 'center'}}>
      <Callout title="Distance" style={{ textAlign: 'left'}}>
        <Composition gap={10} templateCols="1fr auto auto auto auto auto">
          <Box>Distance to target</Box>
          <Box>
            <NumberInput
              accessor={state => state.parameter.operating_mode.distance.setpoint_distance_to_target}
              writer={(state, value) => {
                state.parameter.operating_mode.distance.setpoint_distance_to_target = value
              }}
              min={0}
              max={65535}/>
          </Box>
          <Box>±</Box>
          <Box>
            <NumberInput
              accessor={state => state.parameter.operating_mode.distance.positioning_error_boundaries}
              writer={(state, value) => {
                state.parameter.operating_mode.distance.positioning_error_boundaries = value
              }}
              min={0}
              max={255}/>
          </Box>
          <Box>mm</Box>
          <Box>
            <HelpPopover title="RC car length">
              The over all car length.
            </HelpPopover>
          </Box>
        </Composition>
        <Composition gap={10} templateCols="1fr auto auto auto" style={{ textAlign: 'left'}}>
          <Box>Threshold fine positioning</Box>
          <Box>
            <NumberInput
              accessor={state => state.parameter.operating_mode.distance.threshold_fine_positioning}
              writer={(state, value) => {
                state.parameter.operating_mode.distance.threshold_fine_positioning = value
              }}
              min={0}
              max={65535}/>
          </Box>
          <Box>mm</Box>
          <Box>
            <HelpPopover title="RC car length">
              The over all car length.
            </HelpPopover>
          </Box>
        </Composition>
      </Callout>
    </Callout>
  )
}

export const SettingsPage = (props: RouteComponentProps) => {
  return (
    <Composition areas={layoutDescription} gap={10} autoCols="1fr">
      {Areas => (
        <React.Fragment>
          <SaveContainer>
            <Areas.Save>
              <Save/>
            </Areas.Save>
            <Areas.Car>
              <Car/>
            </Areas.Car>
            <Areas.Imu>
              <Imu/>
            </Areas.Imu>
            <Areas.Vfs>
              <Vfs/>
            </Areas.Vfs>
            <Areas.Servo>
              <Servo/>
            </Areas.Servo>
            <Areas.Navlight>
              <Navlight/>
            </Areas.Navlight>
            <Areas.Odometry>
              <Odometry/>
            </Areas.Odometry>
            <Areas.Operatingmode>
              <OperatingMode/>
            </Areas.Operatingmode>
          </SaveContainer>
        </React.Fragment>
      )}
    </Composition>
  )
}
