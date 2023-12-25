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
  Build Build
  Esp Stm
  Readme Readme
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
            <Areas.Esp>
              <Card>
                <div style={{ textAlign: 'center'}}>
                  <h2>ESP32 Device info</h2>
                </div>

                <Composition templateCols="1fr 1fr" gap={15}>
                  <Box>
                    <b>Processor</b>
                  </Box>
                  <Box>
                    <p>ESP32-S3</p>
                  </Box>
                  <Box>
                    <b>Frequency</b>
                  </Box>
                  <Box>
                    <p>240 MHz</p>
                  </Box>
                  <Box>
                    <b>Flash</b>
                  </Box>
                  <Box>
                    <p>8 MB</p>
                  </Box>
                  <Box>
                    <b>Ram</b>
                  </Box>
                  <Box>
                    <p>512 kB</p>
                  </Box>
                  <Box>
                    <b>Mac</b>
                  </Box>
                  <Box>
                    <Printer accessor={state => state.board.mac[0]}/>
                    :
                    <Printer accessor={state => state.board.mac[1]}/>
                    :
                    <Printer accessor={state => state.board.mac[2]}/>
                    :
                    <Printer accessor={state => state.board.mac[3]}/>
                    :
                    <Printer accessor={state => state.board.mac[4]}/>
                    :
                    <Printer accessor={state => state.board.mac[5]}/>
                  </Box>
                  <Box>
                    <b>Ip</b>
                  </Box>
                  <Box>
                    <Printer accessor={state => state.board.ip[0]}/>
                    .
                    <Printer accessor={state => state.board.ip[1]}/>
                    .
                    <Printer accessor={state => state.board.ip[2]}/>
                    .
                    <Printer accessor={state => state.board.ip[3]}/>
                  </Box>
                  <Box>
                    <b>Websocket</b>
                  </Box>
                  <Box>
                    <WebsocketConnected/>
                  </Box>
                </Composition>
              </Card>
            </Areas.Esp>
            <Areas.Stm>
              <Card>
                <div style={{ textAlign: 'center'}}>
                  <h2>STM32 Device info</h2>
                </div>

                <Composition templateCols="1fr 1fr" gap={15}>
                  <Box>
                    <b>Processor</b>
                  </Box>
                  <Box>
                    <p>STM32-F401RE / STM32-F446RE</p>
                  </Box>
                  <Box>
                    <b>Frequency</b>
                  </Box>
                  <Box>
                    <p>84 MHz / 180 MHz</p>
                  </Box>
                  <Box>
                    <b>Flash</b>
                  </Box>
                  <Box>
                    <p>512 kB / 512 kB (4 kB Backup)</p>
                  </Box>
                  <Box>
                    <b>Ram</b>
                  </Box>
                  <Box>
                    <p>96 kB / 128 kB</p>
                  </Box>
                </Composition>
              </Card>
            </Areas.Stm>
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
                    <p>0.0.0</p>
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
                
              </Card>
            </Areas.Readme>
          </React.Fragment>
        )}
      </Composition>
    </React.Fragment>
  )
}
