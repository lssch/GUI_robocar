import React from 'react'
import {RouteComponentProps} from '@reach/router'
import {Card, Divider, Intent} from '@blueprintjs/core'
import {Box, Composition} from 'atomic-layout'
import { Icon } from '@blueprintjs/core'
import { IconNames } from "@blueprintjs/icons";
import {Printer} from "@electricui/components-desktop";
import {MSGID} from "../../typedState";
import {useHardwareState} from "@electricui/components-core";


const layoutDescription = `
  Build
  Readme
`

const WebsocketConnected = () => {
  const connected = useHardwareState(state => state.board.connected)
  if (connected === 1) {
    return (
      <span>
        <Icon icon={IconNames.OFFLINE} intent={Intent.SUCCESS} />
        <p>connected</p>
      </span>
    )
  }
  return (
    <span>
        <Icon icon={IconNames.OFFLINE} intent={Intent.DANGER} />
        <p>disconnected</p>
      </span>
  )
}

export const InfoPage = (props: RouteComponentProps) => {
  return (
    <React.Fragment>
      <Composition areas={layoutDescription} gap={10} autoCols="1fr">
        {Areas => (
          <React.Fragment>
            <Areas.Build>
              <Card>
                <div style={{ textAlign: 'center'}}>
                  <h2>Build</h2>
                </div>

                <Composition templateCols="1fr 1fr" gap={15}>
                  <Box>
                    <b>Software</b>
                  </Box>
                  <Box>
                    <p>robocar - GUI</p>
                  </Box>
                  <Box>
                    <b>Branch</b>
                  </Box>
                  <Box>
                    <p>main</p>
                  </Box>
                  <Box>
                    <b>Version</b>
                  </Box>
                  <Box>
                    <p>1.0.0</p>
                  </Box>
                  <Box>
                    <b>Author</b>
                  </Box>
                  <Box>
                    <p>lssch - Lars Schwarz</p>
                  </Box>
                </Composition>
              </Card>
            </Areas.Build>
            <Areas.Readme>
              <Card>
                <div style={{ textAlign: 'center'}}>
                  <h2>Readme</h2>
                </div>
                <p>
                  This is a third semester project at FHGR to develop a semi autonomos rc car with simple obstancle avoidance. The project consists of three main software components.
                </p>
                <ul>
                  <li>
                    <a href={"https://github.com/lssch/STM32_Robocar_FW"}>STM32 Firmware</a>
                  </li>
                  <li>
                    <a href={"https://github.com/lssch/ESP32_Robocar_FW"}>ESP32 Firmware</a>
                  </li>
                  <li>
                    <a href={"https://github.com/lssch/GUI_robocar"}>GUI</a>
                  </li>
                </ul>
              </Card>
            </Areas.Readme>
          </React.Fragment>
        )}
      </Composition>
    </React.Fragment>
  )
}
