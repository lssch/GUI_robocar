import {Cartesian3} from "../typedState";

export type Imu = {
  temperature: number;
  accelerometer: Cartesian3;
  gyroscope: Cartesian3;
}

export type VfsMotion = {
  dx: number;
  dy: number;
}

export type Vfs = {
  motion: VfsMotion;
  surface_quality: number;
}

export type TofCamera = {
  pixel: number[];
}

export type TofSpot = {
  distance: number;
}

export type Sensor = {
  imu: Imu;
  vfs: Vfs;
  tof_camera: TofCamera;
  tof_spot: TofSpot;
}