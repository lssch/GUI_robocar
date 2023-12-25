import { Codec, Message } from '@electricui/core'

import {Board, MSGID} from '../../application/typedState'
import {Controls, Request} from "../../application/types/request";
import {Imu, Sensor, TofCamera, TofSpot, Vfs} from "../../application/types/sensor";
import {Data} from "../../application/types/data";
import {Parameter} from "../../application/types/parameter";
import {State} from "../../application/types/state";
import { SmartBuffer } from 'smart-buffer'
import {Gui} from "../../application/types/gui";

export class GuiCodec extends Codec<Gui> {
  filter(message: Message): boolean {
    return message.messageID === MSGID.GUI
  }

  encode(payload: Gui): Buffer {
    const packet = new SmartBuffer({size: 1})
    packet.writeUInt8(payload.path)

    return packet.toBuffer()
  }

  decode(payload: Buffer) {
    const reader = SmartBuffer.fromBuffer(payload)
    const gui: Gui = {
      path: reader.readUInt8()
    }

    return gui
  }
}

export class BoardCodec extends Codec<Board> {
  filter(message: Message): boolean {
    return message.messageID === MSGID.BOARD
  }

  encode(payload: Board): Buffer {
    throw new Error('Board data is read only! Trying to access read only data...')
  }

  decode(payload: Buffer) {
    const reader = SmartBuffer.fromBuffer(payload)

    const data: Board = {
      mac: [
        reader.readUInt8(),
        reader.readUInt8(),
        reader.readUInt8(),
        reader.readUInt8(),
        reader.readUInt8(),
        reader.readUInt8(),
      ],
      ip: [
        reader.readUInt8(),
        reader.readUInt8(),
        reader.readUInt8(),
        reader.readUInt8()
      ]
    }

    return data
  }
}

export class StateCodec extends Codec<State> {
  filter(message: Message): boolean {
    return message.messageID === MSGID.STATE
  }

  encode(payload: State): Buffer {
    throw new Error('State data is read only! Trying to access read only data...')
  }

  decode(payload: Buffer) {
    const reader = SmartBuffer.fromBuffer(payload)

    const data: State = {
      robocar: reader.readUInt8(),
      imu: reader.readUInt8(),
    }

    return data
  }
}

export class SensorCodec extends Codec<Sensor> {
  filter(message: Message): boolean {
    return message.messageID === MSGID.SENSOR
  }

  encode(payload: Sensor): Buffer {
    throw new Error('Sensor data is read only! Trying to access read only data...')
  }

  decode(payload: Buffer) {
    const reader = SmartBuffer.fromBuffer(payload)

    const imu: Imu = {
      temperature: reader.readFloatLE(),
      accelerometer: {
        x: reader.readFloatLE(),
        y: reader.readFloatLE(),
        z: reader.readFloatLE(),
      },
      gyroscope: {
        x: reader.readFloatLE(),
        y: reader.readFloatLE(),
        z: reader.readFloatLE(),
      }
    }
    const vfs: Vfs = {
      motion: {
        dx: reader.readFloatLE(),
        dy: reader.readFloatLE(),
      },
      surface_quality: reader.readUInt8(),
    }

    const tofCamera: TofCamera = {
      pixel: []
    }

    for (let y = 0; y < 25; y++) {
      for (let x = 0; x < 25; x++) {
        tofCamera.pixel.push(reader.readUInt8())
      }
    }

    const tofSpot: TofSpot = {
      distance: reader.readUInt16LE()
    }

    const sensor: Sensor = {
      imu: imu,
      vfs: vfs,
      tof_camera: tofCamera,
      tof_spot: tofSpot
    }

    return sensor
  }
}

export class DataCodec extends Codec<Data> {
  filter(message: Message): boolean {
    return message.messageID === MSGID.DATA
  }

  encode(payload: Data): Buffer {
    throw new Error('Data data is read only! Trying to access read only data...')
  }

  decode(payload: Buffer) {
    const reader = SmartBuffer.fromBuffer(payload)

    const data: Data = {
      imu: {
        gyro_calibration_values: {
          x: reader.readFloatLE(),
          y: reader.readFloatLE(),
          z: reader.readFloatLE(),
        }
      },
      distance_to_target: reader.readUInt16LE(),
      position: {
        x: reader.readFloatLE(),
        y: reader.readFloatLE(),
      },
      velocity: {
        x: reader.readFloatLE(),
        y: reader.readFloatLE(),
      }
    }

    return data
  }
}

export class ParameterCodec extends Codec<Parameter> {
  filter(message: Message): boolean {
    return message.messageID === MSGID.PARAMETER
  }

  encode(payload: Parameter): Buffer {
    const packet = new SmartBuffer({size: 56})
    packet.writeUInt16LE(payload.car.chassis_length)
    packet.writeUInt8(payload.car.chassis_width)
    packet.writeUInt8(payload.car.wheel_diameter)
    packet.writeUInt16LE(payload.imu.gyro_max_dps)
    packet.writeUInt8(payload.imu.gyro_samplerate_divisor)
    packet.writeUInt8(payload.imu.accel_max_g)
    packet.writeUInt8(payload.imu.gyro_calibration_samples)
    packet.writeUInt8(payload.vfs.height)
    packet.writeUInt8(payload.vfs.measured_target_length)
    packet.writeUInt8(payload.vfs.led_shutter)
    packet.writeUInt8(payload.vfs.high_resolution)
    packet.writeUInt8(payload.vfs.light_color.red)
    packet.writeUInt8(payload.vfs.light_color.green)
    packet.writeUInt8(payload.vfs.light_color.blue)
    packet.writeUInt8(payload.vfs.light_color.alpha)
    packet.writeInt16LE(payload.servo.zero_position)
    packet.writeInt16LE(payload.servo.max_steering_angle)
    packet.writeInt16LE(payload.servo.steering_limits)
    packet.writeUInt8(payload.navlight.color_blinker.red)
    packet.writeUInt8(payload.navlight.color_blinker.green)
    packet.writeUInt8(payload.navlight.color_blinker.blue)
    packet.writeUInt8(payload.navlight.color_blinker.alpha)
    packet.writeUInt8(payload.navlight.color_front.red)
    packet.writeUInt8(payload.navlight.color_front.green)
    packet.writeUInt8(payload.navlight.color_front.blue)
    packet.writeUInt8(payload.navlight.color_front.alpha)
    packet.writeUInt8(payload.navlight.color_back.red)
    packet.writeUInt8(payload.navlight.color_back.green)
    packet.writeUInt8(payload.navlight.color_back.blue)
    packet.writeUInt8(payload.navlight.color_back.alpha)
    packet.writeInt8(payload.odometry.imu_link.x)
    packet.writeInt8(payload.odometry.imu_link.y)
    packet.writeInt8(payload.odometry.imu_link.z)
    packet.writeInt8(payload.odometry.tof_spot_link.x)
    packet.writeInt8(payload.odometry.tof_spot_link.y)
    packet.writeInt8(payload.odometry.tof_spot_link.z)
    packet.writeInt8(payload.odometry.tof_cam_link.x)
    packet.writeInt8(payload.odometry.tof_cam_link.y)
    packet.writeInt8(payload.odometry.tof_cam_link.z)
    packet.writeInt8(payload.odometry.vfs_link.x)
    packet.writeInt8(payload.odometry.vfs_link.y)
    packet.writeInt8(payload.odometry.vfs_link.z)
    packet.writeInt16LE(payload.operating_mode.distance.setpoint_distance_to_target)
    packet.writeInt8(payload.operating_mode.distance.positioning_error_boundaries)
    packet.writeInt16LE(payload.operating_mode.distance.threshold_fine_positioning)

    return packet.toBuffer()
  }


  decode(payload: Buffer) {
    const reader = SmartBuffer.fromBuffer(payload)

    const data: Parameter = {
      car: {
        chassis_length: reader.readUInt16LE(),
        chassis_width: reader.readUInt8(),
        wheel_diameter: reader.readUInt8()
      },
      imu: {
        gyro_max_dps: reader.readUInt16LE(),
        gyro_samplerate_divisor: reader.readUInt8(),
        accel_max_g: reader.readUInt8(),
        gyro_calibration_samples: reader.readUInt8(),
      },
      vfs: {
        height: reader.readUInt8(),
        measured_target_length: reader.readUInt8(),
        led_shutter: reader.readUInt8(),
        high_resolution: reader.readUInt8(),
        light_color: {
            red: reader.readUInt8(),
            green: reader.readUInt8(),
            blue: reader.readUInt8(),
            alpha: reader.readUInt8(),
        },
      },
      servo: {
        zero_position: reader.readInt16LE(),
        max_steering_angle: reader.readInt16LE(),
        steering_limits: reader.readInt16LE(),
      },
      navlight: {
        color_blinker: {
          red: reader.readUInt8(),
          green: reader.readUInt8(),
          blue: reader.readUInt8(),
          alpha: reader.readUInt8(),
        },
        color_front: {
          red: reader.readUInt8(),
          green: reader.readUInt8(),
          blue: reader.readUInt8(),
          alpha: reader.readUInt8(),
        },
        color_back: {
          red: reader.readUInt8(),
          green: reader.readUInt8(),
          blue: reader.readUInt8(),
          alpha: reader.readUInt8(),
        }
      },
      odometry: {
        origin_to_front: reader.readInt16LE(),
        origin_to_back: reader.readInt16LE(),
        imu_link: {
          x: reader.readInt8(),
          y: reader.readInt8(),
          z: reader.readInt8(),
        },
        tof_spot_link: {
          x: reader.readInt8(),
          y: reader.readInt8(),
          z: reader.readInt8(),
        },
        tof_cam_link: {
          x: reader.readInt8(),
          y: reader.readInt8(),
          z: reader.readInt8(),
        },
        vfs_link: {
          x: reader.readInt8(),
          y: reader.readInt8(),
          z: reader.readInt8(),
        },
      },
      operating_mode: {
        distance: {
          setpoint_distance_to_target: reader.readUInt16LE(),
          positioning_error_boundaries: reader.readUInt8(),
          threshold_fine_positioning: reader.readUInt16LE(),
        }
      }
    }

    return data
  }
}

export class RequestCodec extends Codec<Request> {
  filter(message: Message): boolean {
    return message.messageID === MSGID.REQUEST

  }

  encode(payload: Request): Buffer {
    const packet = new SmartBuffer({size: 10})

    packet.writeUInt8(payload.operating_mode)
    packet.writeUInt8(payload.max_speed)
    packet.writeUInt8(
      payload.safe_parameters << 0 |
      payload.calibrate_imu << 1 |
      payload.emergency_stop << 2 |
      payload.hardware_reset << 3 |
      payload.reset_odomety << 4)
    packet.writeInt8(payload.controls.throttle)
    packet.writeInt16LE(payload.controls.steering)

    return packet.toBuffer()

  }

  decode(payload: Buffer) {
    const reader = SmartBuffer.fromBuffer(payload)

    const operating_mode: number = reader.readUInt8()
    const max_speed: number = reader.readUInt8()
    const bitfield: number = reader.readUInt8()
    const controls: Controls = {
      throttle: reader.readInt8(),
      steering: reader.readInt16LE()
    }


    const data: Request = {
      operating_mode: operating_mode,
      max_speed: max_speed,
      safe_parameters: bitfield & 0b00000001 >> 0,
      calibrate_imu: bitfield & 0b00000010 >> 1,
      emergency_stop: bitfield & 0b00000100 >> 2,
      hardware_reset: bitfield & 0b00001000 >> 3,
      reset_odomety: bitfield & 0b00010000 >> 4,
      controls: controls,
    }

    return data
  }
}
