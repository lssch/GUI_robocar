/**
 * To strictly type all accessors and writers, remove
 *
 * [messageID: string]: any
 *
 * And replace with your entire state shape after codecs have decoded them.
 */

declare global {
  interface ElectricUIDeveloperState {
    [messageID: string]: any
  }
  interface ElectricUIDeviceMetadataState {
    name: string
  }
}

export type Board = {
  mac: number[]
  ip: number[]
}

export type RGB = {
  red: number;
  green: number;
  blue: number;
}

export type RGBA = {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

export type Cartesian2 = {
  x: number;
  y: number;
}

export type Cartesian3 = {
  x: number;
  y: number;
  z: number;
}

export enum MSGID {
  GUI = 'gui',
  NICKNAME = 'name',
  REQUEST = 'request',
  SENSOR = 'sensor',
  DATA = 'data',
  PARAMETER = 'parameter',
  STATE = 'state',
  BOARD = 'board',
}