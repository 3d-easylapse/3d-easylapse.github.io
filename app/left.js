import { VStack } from "@chakra-ui/react";
import Top from "./top";
import Mid from "./mid";
import Bottom from "./bottom";

function Left() {
  return (
    <VStack flexGrow={1} align="stretch">
      <Top />
      <Mid />
      <Bottom />
    </VStack>
  );
}

export default Left;
