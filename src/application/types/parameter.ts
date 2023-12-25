import {Cartesian3, RGBA} from "../typedState";

export enum IMU_GYRO_MAX_DPS {
  PM_250_DPS = 250,
  PM_500_DPS = 500,
  PM_1000_DPS = 1000,
  PM_2000_DPS = 2000,
}

export enum IMU_ACCEL_MAX_G {
  PM_2G = 2,
  PM_4G = 4,
  PM_8G = 8,
  PM_16G = 16,
}

export type Imu = {
  gyro_max_dps: IMU_GYRO_MAX_DPS;
  gyro_samplerate_divisor: number;
  accel_max_g: IMU_ACCEL_MAX_G;
  gyro_calibration_samples: number;
}

export type Vfs = {
  height: number;
  measured_target_length: number;
  led_shutter: number;
  high_resolution: number;
  light_color: RGBA;
}

export type Car = {
  chassis_length: number;
  chassis_width: number;
  wheel_diameter: number;
}

export type Servo = {
  zero_position: number;
  max_steering_angle: number;
  steering_limits: number;
}

export type Navlight = {
  color_blinker: RGBA;
  color_front: RGBA;
  color_back: RGBA;
}

export type Odometry = {
  origin_to_front: number;
  origin_to_back: number;
  imu_link: Cartesian3;
  tof_spot_link: Cartesian3;
  tof_cam_link: Cartesian3;
  vfs_link:Cartesian3;
}

export type Distance = {
  setpoint_distance_to_target: number;
  positioning_error_boundaries: number;
  threshold_fine_positioning: number;
}

export type OperatingMode = {
  distance: Distance;
}

export type Parameter = {
  car: Car;
  imu: Imu;
  vfs: Vfs;
  servo: Servo;
  navlight: Navlight;
  odometry: Odometry;
  operating_mode: OperatingMode;
}