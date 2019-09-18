import React from "react";
import { Box, Image } from "grommet";

export default ({ src, id, name }) => (
  <Box>
    {name}
    {src ? null : "loading"}
    <Box color="whitesmoke" height="small" width="small">
      <Image fit="cover" src={src} />
    </Box>
  </Box>
);
