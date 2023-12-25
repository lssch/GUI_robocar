import {Card, HTMLTable} from "@blueprintjs/core";
import React from "react";
import {Box, Composition} from "atomic-layout";


export const Deviceinfo = (props: { title: string; }) => {
  return (
    <Card>
      <div style={{ textAlign: 'center'}}>
        <h2>{props.title + ' Device info'}</h2>
      </div>

      <Composition templateCols="1fr 1fr" gap={15}>
        <Box>
          <b>Processor</b>
        </Box>
        <Box># Datafield #</Box>
        <Box>
          <b>Cpu</b>
        </Box>
        <Box># Datafield #</Box>
        <Box>
          <b>Ram</b>
        </Box>
        <Box># Datafield #</Box>
        <Box>
          <b>Flash</b>
        </Box>
        <Box># Datafield #</Box>
        <Box>
          <b>heap</b>
        </Box>
        <Box># Datafield #</Box>
        <Box>
          <b>load</b>
        </Box>
        <Box># Datafield #</Box>
      </Composition>
    </Card>
  )
}