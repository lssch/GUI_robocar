import { Legend } from '@electricui/components-desktop-blueprint-timeseries'
import {
  ChartContainer,
  LineChart,
  RealTimeDomain,
  VerticalAxis,
  TimeAxis,
  useLegend, DataSourcePrinter, TimeSlicedLineChart, RealTimeSlicingDomain, HorizontalAxis
} from '@electricui/components-desktop-charts'
import { MessageDataSource } from '@electricui/core-timeseries'
import {Callout, Colors, Divider} from '@blueprintjs/core'

import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { Card } from '@blueprintjs/core'
import { Composition } from 'atomic-layout'
import {MSGID} from "../../typedState";
import {useHardwareState} from "@electricui/components-core";

const sensorDS = new MessageDataSource(MSGID.SENSOR)

const layoutDescription = `
  Imu
  TofSpot
  Vfs
`

const Imu = () => {
  const legendImuAccel = useLegend({
    x: {
      name: `x-Axis`,
      color: Colors.RED1,
    },
    y: {
      name: 'y-Axis',
      color: Colors.GREEN1,
    },
    z: {
      name: 'z-Axis',
      color: Colors.BLUE1,
    }
  })

  const legendImuGyro = useLegend({
    x: {
      name: 'x-Rotation' ,
      color: Colors.RED1,
    },
    y: {
      name: 'y-Rotation',
      color: Colors.GREEN1,
    },
    z: {
      name: 'z-Rotation',
      color: Colors.BLUE1,
    }
  })

  const legendImuTemperature = useLegend({
    temperature: {
      name: 'Temperature',
      color: Colors.GOLD1,
    },
  })

  return (
    <Card>
      <div style={{ textAlign: 'center'}}>
        <h2>IMU - MPU6050</h2>
      </div>

      <Callout title="Accelerometer" style={{ textAlign: 'center'}}>
        <Legend
          data={legendImuAccel}
          justifyContent="end"/>
        <ChartContainer>
          <LineChart
            dataSource={sensorDS}
            accessor={state => state.imu.accelerometer.x*9.81}
            color={legendImuAccel.x.color}
            opacitySource={legendImuAccel.x.opacity}
            visibilitySource={legendImuAccel.x.visible}
          />
          <LineChart
            dataSource={sensorDS}
            accessor={state => state.imu.accelerometer.y*9.81}
            color={legendImuAccel.y.color}
            opacitySource={legendImuAccel.y.opacity}
            visibilitySource={legendImuAccel.y.visible}
          />
          <LineChart
            dataSource={sensorDS}
            accessor={state => state.imu.accelerometer.z*9.81}
            color={legendImuAccel.z.color}
            opacitySource={legendImuAccel.z.opacity}
            visibilitySource={legendImuAccel.z.visible}
          />
          <RealTimeDomain window={10_000}/>
          <TimeAxis label="Time (s)" />
          <VerticalAxis
            label="m/s^2"
          />
        </ChartContainer>
      </Callout>

      <Divider />

      <Callout title="Gyroscope" style={{ textAlign: 'center'}}>
        <Legend
          data={legendImuGyro}
          justifyContent="end"/>
        <ChartContainer>
          <LineChart
            dataSource={sensorDS}
            accessor={state => state.imu.gyroscope.x}
            color={legendImuGyro.x.color}
            opacitySource={legendImuGyro.x.opacity}
            visibilitySource={legendImuGyro.x.visible}
          />
          <LineChart
            dataSource={sensorDS}
            accessor={state => state.imu.gyroscope.y}
            color={legendImuGyro.y.color}
            opacitySource={legendImuGyro.y.opacity}
            visibilitySource={legendImuGyro.y.visible}
          />
          <LineChart
            dataSource={sensorDS}
            accessor={state => state.imu.gyroscope.z}
            color={legendImuGyro.z.color}
            opacitySource={legendImuGyro.z.opacity}
            visibilitySource={legendImuGyro.z.visible}
          />
          <RealTimeDomain window={10_000}/>
          <TimeAxis label="Time (s)" />
          <VerticalAxis
            label="m/s^2"
          />
        </ChartContainer>
      </Callout>

      <Divider />

      <Callout title="Temperature" style={{ textAlign: 'center'}}>
        <Legend
          data={legendImuTemperature}
          justifyContent="end"
          noHover
          noToggle/>
        <ChartContainer>
          <LineChart
            dataSource={sensorDS}
            accessor={state => state.imu.temperature}
            color={legendImuTemperature.temperature.color}
            opacitySource={legendImuTemperature.temperature.opacity}
            visibilitySource={legendImuTemperature.temperature.visible}
          />
          <RealTimeDomain window={10_000}/>
          <TimeAxis label="Time (s)" />
          <VerticalAxis
            label="°C"
          />
        </ChartContainer>
      </Callout>
    </Card>
  )
}

const TofSpot = () => {
  const legend = useLegend({
    distance: {
      name: 'Distance',
      color: Colors.RED1,
    },
  })

  return (
    <Card>
      <div style={{ textAlign: 'center'}}>
        <h2>ToF Spot</h2>
      </div>

      <Callout title="Distance" style={{ textAlign: 'center'}}>
        <Legend
          data={legend}
          justifyContent="end"
          noHover
          noToggle/>
        <ChartContainer>
          <LineChart
            dataSource={sensorDS}
            accessor={state => state.tof_spot.distance}
            color={legend.distance.color}
            opacitySource={legend.distance.opacity}
            visibilitySource={legend.distance.visible}
          />
          <RealTimeDomain window={10_000}/>
          <TimeAxis label="Time (s)" />
          <VerticalAxis
            label="mm"
          />
        </ChartContainer>
      </Callout>
    </Card>
  )
}

const Vfs = () => {
  const legendMotion = useLegend({
    x: {
      name: 'x-Axis',
      color: Colors.RED1,
    },
    y: {
      name: 'y-Axis',
      color: Colors.GREEN1,
    },
  })

  const legendSurfaceQuality = useLegend({
    surface_quality: {
      name: 'Surface quality',
      color: Colors.GOLD1,
    },
  })

  return (
    <Card>
      <div style={{ textAlign: 'center'}}>
        <h2>VFS - ADNS3080</h2>
      </div>

      <Callout title="Motion" style={{ textAlign: 'center'}}>
        <Legend
          data={legendMotion}
          justifyContent="end"/>
        <ChartContainer>
          <LineChart
            dataSource={sensorDS}
            accessor={state => state.vfs.motion.dx}
            color={legendMotion.x.color}
            opacitySource={legendMotion.x.opacity}
            visibilitySource={legendMotion.x.visible}
          />
          <LineChart
            dataSource={sensorDS}
            accessor={state => state.vfs.motion.dy}
            color={legendMotion.y.color}
            opacitySource={legendMotion.y.opacity}
            visibilitySource={legendMotion.y.visible}
          />
          <RealTimeDomain window={10_000}/>
          <TimeAxis label="Time (s)" />
          <VerticalAxis
            label="avg pixel movement"
          />
        </ChartContainer>

        <ChartContainer>
          <TimeSlicedLineChart
            dataSource={sensorDS}
            accessor={(state, time) => ({x: state.vfs.motion.dx, y: state.vfs.motion.dy})}
          />
          <RealTimeSlicingDomain window={10000} />
          <HorizontalAxis label="x-Displacement m" />
          <VerticalAxis label="y-Displacement m" />
        </ChartContainer>
      </Callout>

        <Divider />

      <Callout title="Surface quality" style={{ textAlign: 'center'}}>
        <Legend
          data={legendSurfaceQuality}
          justifyContent="end"
          noHover
          noToggle/>
        <ChartContainer>
          <LineChart
            dataSource={sensorDS}
            accessor={state => state.vfs.surface_quality*100/169}
            color={legendSurfaceQuality.surface_quality.color}
            opacitySource={legendSurfaceQuality.surface_quality.opacity}
            visibilitySource={legendSurfaceQuality.surface_quality.visible}
          />
          <RealTimeDomain window={10_000}/>
          <TimeAxis label="Time (s)" />
          <VerticalAxis
            label="Quality %"
          />
        </ChartContainer>
      </Callout>
    </Card>
  )
}

export const SensorsPage = (props: RouteComponentProps) => {
  return (
    <React.Fragment>
      <Composition areas={layoutDescription} gap={10} autoCols="1fr">
        {Areas => (
          <React.Fragment>
            <Areas.Imu>
              <Imu/>
            </Areas.Imu>
            <Areas.TofSpot>
              <TofSpot/>
            </Areas.TofSpot>
            <Areas.Vfs>
              <Vfs/>
            </Areas.Vfs>
          </React.Fragment>
        )}
      </Composition>
    </React.Fragment>
  )
}
