import { Alignment, Button, Navbar } from '@blueprintjs/core'
import {
  useDeadline,
  useDeviceConnect,
  useDeviceConnectionRequested,
  useDeviceDisconnect, useWriteState,
} from '@electricui/components-core'

import React, {useCallback} from 'react'
import { RouteComponentProps } from '@reach/router'
import { navigate } from '@electricui/utility-electron'
import { Icon } from '@blueprintjs/core'
import { IconNames } from "@blueprintjs/icons";
import {PATH} from "../../types/gui";

interface InjectDeviceIDFromLocation {
  deviceID?: string
  '*'?: string // we get passed the path as the wildcard
}

export const Header = (
  props: RouteComponentProps & InjectDeviceIDFromLocation,
) => {
  const disconnect = useDeviceDisconnect()
  const connect = useDeviceConnect()
  const connectionRequested = useDeviceConnectionRequested()
  const writeState = useWriteState()
  const getDeadline = useDeadline()

  const page = props['*'] // we get passed the path as the wildcard, so we read it here

  const onClickCallback = useCallback(
    (page: number) => {
      const cancellationToken = getDeadline()
      writeState(
        state => {
          state.gui.path = page
        },
        true,
        cancellationToken,
      )
    },
    [
      /* closure dependencies, none in this case */
    ],
  )

  return (
    <div className="device-header">
      <Navbar style={{ background: 'transparent', boxShadow: 'none' }}>
        <div style={{ margin: '0 auto', width: '100%' }}>
          <Navbar.Group align={Alignment.LEFT}>
            <Button
              minimal
              large
              icon={IconNames.HOME}
              text="Back"
              onClick={() => {
                navigate('/')
                onClickCallback(PATH.HOME)
              }}
            />

            {connectionRequested ? (
              <Button
                minimal
                intent="danger"
                icon={IconNames.CROSS}
                text="Disconnect"
                onClick={() => {
                  disconnect().catch(err => {
                    console.warn('Failed to disconnect', err)
                  })
                  // Go home on disconnect
                  navigate(`/`)
                  onClickCallback(PATH.HOME)
                }}
              />
            ) : (
              <Button
                minimal
                icon={IconNames.LINK}
                intent="success"
                text="Connect again"
                onClick={() => {
                  const cancellationToken = getDeadline()

                  connect(cancellationToken).catch(err => {
                    if (cancellationToken.caused(err)) {
                      return
                    }

                    console.warn('Failed to connect', err)
                  })
                }}
              />
            )}
          </Navbar.Group>{' '}
          <Navbar.Group align={Alignment.RIGHT}>
            <Button
              minimal
              large
              icon={IconNames.DASHBOARD}
              text="Overview"
              onClick={() => {
                navigate(`/devices/${props.deviceID}/`)
                onClickCallback(PATH.HOME)
              }}
              active={page === ''}
            />
            <Button
              minimal
              large
              icon={IconNames.SETTINGS}
              text="Sensors"
              onClick={() => {
                navigate(`/devices/${props.deviceID}/sensors`)
                onClickCallback(PATH.SENSORS)
              }}
              active={page === 'sensors'}
            />
            <Button
              minimal
              large
              icon={IconNames.WRENCH}
              text="Settings"
              onClick={() => {
                navigate(`/devices/${props.deviceID}/settings`)
                onClickCallback(PATH.SETTINGS)
              }}
              active={page === 'settings'}
            />
            <Button
              minimal
              large
              icon="settings"
              text="Info"
              onClick={() => {
                navigate(`/devices/${props.deviceID}/info`)
                onClickCallback(PATH.INFO)
              }}
              active={page === 'info'}
            />
          </Navbar.Group>{' '}
        </div>
      </Navbar>
    </div>
  )
}
