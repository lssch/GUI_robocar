import {
  ChartContainer, HorizontalAxis,
  LineChart,
  RealTimeDomain, RealTimeSlicingDomain,
  TimeAxis, TimeSlicedLineChart, useLegend,
  VerticalAxis,
} from '@electricui/components-desktop-charts'

import {Button, Callout, Card, Colors, Divider, Intent} from '@blueprintjs/core'
import {Box, Composition} from 'atomic-layout'
import {IntervalRequester, useDeadline, useHardwareState, useWriteState} from '@electricui/components-core'
import { MessageDataSource } from '@electricui/core-timeseries'
import React, {useCallback} from 'react'
import { RouteComponentProps } from '@reach/router'
import {Slider, Statistic, Statistics} from '@electricui/components-desktop-blueprint'
import {MSGID} from "../../typedState";
import {Color} from "three";
import {HelpPopover} from "../../HelpPopover";
import {Legend} from "@electricui/components-desktop-blueprint-timeseries";

const layoutDescription = `
  Controls
  Odometry
  Sensors
`

const dataDS = new MessageDataSource(MSGID.DATA)
const sensorDS = new MessageDataSource(MSGID.SENSOR)

const Controls = () => {
  const parameter = useHardwareState(MSGID.PARAMETER)

  return (
    <Card>
      <div style={{ textAlign: 'center'}}>
        <h2>Controls</h2>
      </div>

      <Callout title="Manual Steering" style={{ textAlign: 'center'}}>
        <Slider
          min={-parameter.servo.steering_limits}
          max={parameter.servo.steering_limits}
          labelStepSize={2*parameter.servo.steering_limits/8}
          labelRenderer={(val: number) => `${Math.round(val/parameter.servo.steering_limits * 100)}%`}
          sendOnlyOnRelease={false}
          writer={(state, values) => {
            state.request.controls.steering = values.slider_handle_steering
          }}
        >
          <Slider.Handle
            name="slider_handle_steering"
            accessor={state => state.request.controls.steering}
          />
        </Slider>
        </Callout>
        <Divider/>
        <Callout title="Manual Throttle" style={{ textAlign: 'center'}}>
        <Slider
          min={-100}
          max={100}
          labelStepSize={2*100/8}
          labelRenderer={(val: number) => `${Math.round(val/100 * 100)}%`}
          sendOnlyOnRelease={false}
          writer={(state, values) => {
            state.request.controls.throttle = values.slider_handle_throttle
          }}
        >
          <Slider.Handle
            name="slider_handle_throttle"
            accessor={state => state.request.controls.throttle}
          />
        </Slider>
      </Callout>
    </Card>
  )
}

const Data = () => {
  const data = useHardwareState(MSGID.DATA)
  let distance_color
  let distance_item

  if (data.distance_to_target > 200) {
    distance_color = Colors.GREEN1;
  } else {
    distance_color = Colors.RED1;
  }

  if (data.distance_to_target > 3000) {
    distance_item = <></>
  } else {
    distance_item = <Statistic
      accessor={state => state.data.distance_to_target}
      label="Distance"
      suffix="mm"
      inGroupOf={2}
      color={distance_color}/>
  }

  return (
    <Card>
      <div style={{ textAlign: 'center'}}>
        <h2>Data</h2>
      </div>

      <Callout title="" style={{ textAlign: 'center'}}>
        <Statistics>
          {distance_item}
          <Statistic
            accessor={state => state.data.velocity.x + state.data.velocity.y}
            label="Velocity"
            suffix="mm/s"
            precision={0}
            color={Colors.BLACK}/>
        </Statistics>
      </Callout>
    </Card>
  )
}

const Odometry = () => {
  const writeState = useWriteState()
  const getDeadline = useDeadline()

  const onClickResetOrigin = useCallback(
    () => {
      const cancellationToken = getDeadline()
      writeState(
        state => {
          state.request.reset_odomety = 1
        },
        true,
        cancellationToken
      )
    },
    [],
  )

  const legendVelocity = useLegend({
    x: {
      name: 'x-Velocity',
      color: Colors.RED1,
    },
    y: {
      name: 'y-Velocity',
      color: Colors.GREEN1,
    },
    abs: {
      name: 'abs-Velocity',
      color: Colors.VIOLET1,
    },
  })

  return (
    <Card>
      <div style={{ textAlign: 'center'}}>
        <h2>Odometry</h2>
      </div>

      <Callout title="Reset Odometry data" intent={Intent.WARNING} style={{ textAlign: 'left'}}>
        <Composition gap={10} templateCols="1fr auto">
          <Box style={{ textAlign: 'left'}}>
            <b>Caution</b> Resetting the odometry data does overwrite the world origin to the current position!
          </Box>
          <Box>
            <Button
              large
              onClick={onClickResetOrigin}
              intent={Intent.DANGER}
            >
              Reset Odometry
            </Button>
          </Box>
        </Composition>
      </Callout>

      <Divider/>

      <Callout title="Position" style={{ textAlign: 'center'}}>
        <Composition gap={10} templateCols="1fr 2fr">
          <Box>
            <Statistics>
              <Statistic
                accessor={state => state.data.position.x}
                label="x-Position"
                suffix="m"
                inGroupOf={1}
                precision={3}
                color={Colors.RED1}/>
              <Statistic
                accessor={state => state.data.position.y}
                label="y-Position"
                suffix="m"
                inGroupOf={1}
                precision={3}
                color={Colors.GREEN1}/>
            </Statistics>
          </Box>
          <Box>
            <ChartContainer>
              <TimeSlicedLineChart
                dataSource={dataDS}
                accessor={(state, time) => ({x:  state.position.x, y: state.position.y})}
              />
              <RealTimeSlicingDomain window={10000} />
              <HorizontalAxis label="x-Position m" />
              <VerticalAxis label="y-Position m" />
            </ChartContainer>
          </Box>
        </Composition>
      </Callout>

      <Divider/>

      <Callout title="Velocity" style={{ textAlign: 'center'}}>
        <Composition gap={10} templateCols="1fr 2fr">
          <Box>
            <Statistics>
              <Statistic
                accessor={state => state.data.velocity.x}
                label="x-Velocity"
                suffix="mm/s"
                inGroupOf={1}
                precision={0}
                color={Colors.RED1}/>
              <Statistic
                accessor={state => state.data.velocity.y}
                label="y-Velocity"
                suffix="mm/s"
                inGroupOf={1}
                precision={0}
                color={Colors.GREEN1}/>
              </Statistics>
          </Box>
          <Box>
            <Legend
              data={legendVelocity}
              justifyContent="end"/>
            <ChartContainer>
              <LineChart
                dataSource={dataDS}
                accessor={state => state.velocity.x}
                color={legendVelocity.x.color}
                opacitySource={legendVelocity.x.opacity}
                visibilitySource={legendVelocity.x.visible}
              />
              <LineChart
                dataSource={dataDS}
                accessor={state => state.velocity.y}
                color={legendVelocity.y.color}
                opacitySource={legendVelocity.y.opacity}
                visibilitySource={legendVelocity.y.visible}
              />
              <LineChart
                dataSource={dataDS}
                accessor={state =>state.velocity.x + state.velocity.y}
                color={legendVelocity.abs.color}
                opacitySource={legendVelocity.abs.opacity}
                visibilitySource={legendVelocity.abs.visible}
              />
              <RealTimeDomain window={10_000}/>
              <TimeAxis label="Time (s)" />
              <VerticalAxis
                label="Velocity"
              />
            </ChartContainer>
          </Box>
        </Composition>
      </Callout>
    </Card>
  )
}

export const MainPage = (props: RouteComponentProps) => {
  return (
    <React.Fragment>
      <Composition areas={layoutDescription} gap={10} autoCols="1fr">
        {Areas => (
          <React.Fragment>
            <Areas.Controls>
              <Controls/>
            </Areas.Controls>
            <Areas.Odometry>
              <Odometry/>
            </Areas.Odometry>
            <Areas.Sensors>
              <Data/>
            </Areas.Sensors>
          </React.Fragment>
        )}
      </Composition>
    </React.Fragment>
  )
}
