import {Button, Callout, Card, Divider, Intent, Tag} from '@blueprintjs/core'
import {Box, Composition} from 'atomic-layout'
import {IntervalRequester, useDeadline, useHardwareState, useWriteState} from '@electricui/components-core'
import React, {useCallback} from 'react'
import {Printer} from "@electricui/components-desktop";
import { IconNames } from "@blueprintjs/icons";
import {MESSAGEIDS} from "@electricui/protocol-binary-constants";
import {MSGID} from "../../typedState";
import {Dropdown} from "@electricui/components-desktop-blueprint";
import {Imu, Robocar} from "../../types/state";
import * as path from "path";

const RobocarStatus = () => {
  let component;
  const state = useHardwareState(MSGID.STATE)

  switch (state.robocar) {
    case Robocar.INITIALISING:
      component = <Tag
        rightIcon="airplane"
        intent={Intent.PRIMARY}
        large
        fill
      >
        Initialising
      </Tag>
      break;
    case Robocar.RUNNING:
      component = <Tag
        rightIcon="airplane"
        intent={Intent.SUCCESS}
        large
        fill
      >
        Running
      </Tag>
      break;
    case Robocar.EMS:
      component = <Tag
        rightIcon="airplane"
        intent={Intent.DANGER}
        large
        fill
      >
        Emergency
      </Tag>
      break;
  }

  return (
    <React.Fragment>
      <Callout title="State" icon={IconNames.BUGGY}>
        {component}
      </Callout>
    </React.Fragment>
  )
}

const EmergencyStop = () => {
    let component;
    const request = useHardwareState(MSGID.REQUEST)
    const writeState = useWriteState()
    const getDeadline = useDeadline()

    const onClickEms = useCallback(
      () => {
        const cancellationToken = getDeadline()
        writeState(
          state => {
            state.request.emergency_stop = 1
            state.request.controls.throttle = 0
          },
          true,
          cancellationToken,
        )
      },
      [],
    )

    const onClickReset = useCallback(
      () => {
        const cancellationToken = getDeadline()
        writeState(
          state => {
            state.request.emergency_stop = 0
            state.request.controls.throttle = 0
          },
          true,
          cancellationToken,
        )
      },
      [],
    )

    if (request.emergency_stop) {
      component = <Button
        onClick={onClickReset}
        style={{ width: "100%", height: "50px"}}
        intent="warning"
      >
        <b>Reset EMS</b>
      </Button>
    } else {
      component = <Button
        onClick={onClickEms}
        style={{ width: "100%", height: "50px"}}
        intent="danger"
      >
        <b>Emergency stop</b>
      </Button>
    }

    return (
      <div>
        {component}
      </div>
    )
}

const Controls = () => {
  return (
    <React.Fragment>
      <Callout title="Controls" icon={IconNames.MENU_OPEN}>
        <Composition gap={10} templateCols="auto">
          <Dropdown
            fill
            accessor={state => state.request.max_speed}
            writer={(state, value) => {
              state.request.max_speed = value
            }}
            placeholder={selectedOption =>
              selectedOption ? `Speed: ${selectedOption.text}` : 'Speed'
            }
            popoverProps={{ position: 'right', minimal: false }}
          >
            <Dropdown.Option value={0} text="Slow" label="100 mm/s"/>
            <Dropdown.Option value={1} text="Medium" label="500 mm/s"/>
            <Dropdown.Option value={2} text="Full speed" label=">1 m/s"/>
          </Dropdown>
          <Dropdown
            fill
            accessor={state => state.request.operating_mode}
            writer={(state, value) => {
              state.request.operating_mode = value
            }}
            placeholder={selectedOption =>
              selectedOption ? `Mode: ${selectedOption.text}` : 'Drive mode'
            }
            popoverProps={{ position: 'right', minimal: false }}
          >
            <Dropdown.Option value={0} text="Manual"/>
            <Dropdown.Option value={1} text="Assisted"/>
            <Dropdown.Option value={2} text="Distance"/>
            <Dropdown.Option value={3} text="Autonomous"/>
          </Dropdown>
        </Composition>
      </Callout>
    </React.Fragment>
  )
}

const State = () => {
  let imu_component;
  let robocar_state;
  const state = useHardwareState(MSGID.STATE)

  const writeState = useWriteState()
  const getDeadline = useDeadline()

  const onClickCalibrateImu = useCallback(
    () => {
      const cancellationToken = getDeadline()
      writeState(
        state => {
          state.request.calibrate_imu = 1
        },
        true,
        cancellationToken,
      )
    },
    [
      /* closure dependencies, none in this case */
    ],
  )

  switch (state.robocar) {
    case Robocar.INITIALISING:
      robocar_state = <></>
      break
    case Robocar.RUNNING:
      robocar_state = <></>
      break
    case Robocar.EMS:
      robocar_state = <Callout title="Safety" intent={Intent.DANGER}>
        EMS is triggered
      </Callout>
      break
  }

  switch (state.imu) {
    case Imu.DISCONNECTED:
      imu_component = <Callout title="IMU" intent={Intent.DANGER}>
          IMU is disconnected
        </Callout>
      break

    case Imu.UNCALIBRATED:
      imu_component = <Callout title="IMU" intent={Intent.WARNING}>
          IMU isn't calibrated
            <div>
              <Button
                intent={Intent.SUCCESS}
                style={{ width: "100%"}}
                onClick={onClickCalibrateImu}
                >
                Calibrate
              </Button>
            </div>
        </Callout>
      break

    case Imu.CALIBRATING:
      imu_component = <Callout title="IMU" intent={Intent.WARNING}>
        IMU is calibrating
      </Callout>
      break

    case Imu.CALIBRATED:
      imu_component = <Callout title="IMU" intent={Intent.SUCCESS}>
        IMU is calibrated
        <div>
          <Button
            intent={Intent.SUCCESS}
            style={{ width: "100%"}}
            onClick={onClickCalibrateImu}
          >
            Recalibrate
          </Button>
        </div>
      </Callout>
      break

    case Imu.FAULT:
      imu_component = <Callout title="IMU" intent={Intent.DANGER}>
        IMU is in error state
      </Callout>
  }

  return (
    <React.Fragment>
      {imu_component}
    </React.Fragment>
  )
}

export const Control = () => {
  return (
    <React.Fragment>
      <IntervalRequester variable="sys" interval={250} />
      <Composition gap={10}>
        <div style={{ textAlign: 'center'}}>
          <h1>Robocar GUI</h1>
        </div>
        <RobocarStatus/>
        <EmergencyStop/>
        <Controls/>
        <State/>
      </Composition>
    </React.Fragment>
  )
}