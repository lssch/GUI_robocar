import { RouteComponentProps, Router } from '@reach/router'

import { DisconnectionModal } from '@electricui/components-desktop-blueprint'
import { Header } from '../../components/Header'
import {Intent} from '@blueprintjs/core'
import { MainPage } from './MainPage'
import React from 'react'
import {InfoPage} from "./InfoPage";
import {SensorsPage} from "./SensorsPage";
import {SettingsPage} from "./SettingsPage";

import { navigate } from '@electricui/utility-electron'
import {Composition} from "atomic-layout";
import {Control} from "./Control";

interface InjectDeviceIDFromLocation {
  deviceID?: string
}

const layoutDescription = `
        Control Header
        Control Page
      `

export const DevicePages = (
  props: RouteComponentProps & InjectDeviceIDFromLocation,
) => {
  if (!props.deviceID) {
    return <div>No deviceID?</div>
  }

  return (
    <React.Fragment>
      <DisconnectionModal
        intent={Intent.WARNING}
        icon="satellite"
        navigateToConnectionsScreen={() => navigate('/')}
      >
        <p>
          Connection has been lost with your device. If we successfully
          reconnect this dialog will be dismissed.
        </p>
      </DisconnectionModal>
      <div className="device-pages">
        <div className="device-content">
          <Composition areas={layoutDescription} gap={10} autoCols="auto 1fr">
            {Areas => (
              <React.Fragment>
                <Areas.Header>
                  <Header deviceID={props.deviceID} {...props} />
                </Areas.Header>
                <Areas.Control>
                  <Control/>
                </Areas.Control>
                <Areas.Page>
                  <Router primary={false}>
                    <MainPage path="/"/>
                    <SensorsPage path="sensors"/>
                    <SettingsPage path="settings"/>
                    <InfoPage path="info"/>
                  </Router>
                </Areas.Page>
              </React.Fragment>
            )}
          </Composition>
        </div>
      </div>
    </React.Fragment>
  )
}
