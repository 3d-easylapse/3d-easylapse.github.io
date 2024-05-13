import {
  HStack,
  Heading,
  Image,
  Link,
  Mark,
  Text,
  VStack,
} from "@chakra-ui/react";

function Mid() {
  return (
    <VStack
      flexGrow={1}
      spacing={8}
      paddingLeft={4}
      paddingRight={4}
      justify={"center"}
    >
      <Heading as="h1" size="4xl" textAlign="center">
        Create <Mark color="teal.500">EASY</Mark>
        <br />
        3D Print Time-lapses!
      </Heading>
      <Text fontSize="xl" textAlign="justify">
        Capture those fancy time-lapses of your 3D printings using just a phone!
      </Text>
      <Text fontSize="xs">
        3D EasyLapse has no user analytics tracking. No advertising plugins. No
        data upload to any server.
      </Text>
      <HStack>
        <Link
          flex={1}
          href="https://play.google.com/store/apps/details?id=com.icarodlima.easylapse3d"
          target="_blank"
        >
          <Image
            maxHeight={16}
            objectFit="contain"
            src="android-badge.png"
            alt="Google Play download button"
          />
        </Link>
        <Link
          flex={1}
          /*onClick={() =>
            alert(
              "iOS app is under construction. Keep calm, we are almost there!"
            )
          }*/
        >
          <Image
            maxHeight={16}
            objectFit="contain"
            src="ios-badge.png"
            alt="App Store download button"
          />
        </Link>
      </HStack>
    </VStack>
  );
}

export default Mid;
