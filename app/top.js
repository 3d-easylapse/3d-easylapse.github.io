import { HStack, Heading, Image } from "@chakra-ui/react";

function Top() {
  return (
    <HStack paddingTop={2} paddingBottom={2} paddingLeft={4} gap={1}>
      <Image
        height={16}
        src="logo192.png"
        alt="The website's logo. It is a black 3D printer with a extruder moving fast to the right."
      />
      <Heading as="h4" size="md">
        3D EasyLapse
      </Heading>
    </HStack>
  );
}

export default Top;
