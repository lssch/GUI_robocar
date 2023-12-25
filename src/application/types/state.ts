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

export enum TofSpot {
  VALID_DATA = 0x00,
  VCSEL_SHORT = 0x01,
  LOW_SIGNAL = 0x02,
  LOW_SN = 0x04,
  TOO_MUCH_AMB = 0x08,
  WAF = 0x10,
  CAL_ERROR = 0x20,
  CROSSTALK_ERROR = 0x80,
}


export type State = {
  robocar: Robocar;
  imu: Imu;
  tof_spot: TofSpot;
}