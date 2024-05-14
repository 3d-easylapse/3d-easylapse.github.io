import { HStack } from "@chakra-ui/react";
import Left from "./left";
import Right from "./right";

export default function Home() {
  return (
    <HStack minHeight="100vh" align="stretch" flexWrap="wrap">
      <Left />
      <Right />
    </HStack>
  );
}
