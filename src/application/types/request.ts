export enum OperatingMode {
  MANUAL = 0,
  ASSISTED,
  DISTANCE,
  AUTONOMOUS
}

export enum MaxSpeed {
  SLOW = 0,
  MEDIUM,
  FULL_SPEED
}

export type Controls = {
  throttle: number;
  steering: number;
};

export type Request = {
  operating_mode: OperatingMode;
  max_speed: MaxSpeed;
  safe_parameters: number;
  calibrate_imu: number;
  emergency_stop: number;
  hardware_reset: number;
  reset_odomety: number;
  controls: Controls;
}