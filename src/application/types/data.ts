import {Cartesian2, Cartesian3} from "../typedState";

export type Imu = {
  gyro_calibration_values: Cartesian3;
}

export type Data =  {
  imu: Imu;
  distance_to_target: number;
  position: Cartesian2;
  velocity: Cartesian2;
}