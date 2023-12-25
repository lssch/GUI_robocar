export enum Robocar {
  INITIALISING = 0,
  RUNNING,
  EMS,
}

export enum Imu {
  DISCONNECTED = 0,
  UNCALIBRATED,
  CALIBRATING,
  CALIBRATED,
  FAULT,
}


export type State = {
  robocar: Robocar;
  imu: Imu;
}