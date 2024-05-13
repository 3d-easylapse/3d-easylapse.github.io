import { HStack } from "@chakra-ui/react";
import Left from "./left";

export default function Home() {
  return (
    <HStack minHeight="100vh" align="stretch">
      <Left />
    </HStack>
  );
}
