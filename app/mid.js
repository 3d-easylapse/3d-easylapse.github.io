"use client";

import {
  HStack,
  Heading,
  Icon,
  Image,
  Link,
  Mark,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaGithub, FaEnvelope, FaYoutube, FaInstagram } from "react-icons/fa6";

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
          onClick={() =>
            alert(
              "iOS app is under construction. Keep calm, we are almost there!"
            )
          }
        >
          <Image
            maxHeight={16}
            objectFit="contain"
            src="ios-badge.png"
            alt="App Store download button"
          />
        </Link>
      </HStack>
      <HStack gap={2} >
        <Link
          href="https://github.com/3d-easylapse/3d-easylapse.github.io"
          target="_blank"
        >
          <Icon as={FaGithub} boxSize={6} />
        </Link>
        <Link href="http://www.youtube.com/@icarodlima" target="_blank">
          <Icon as={FaYoutube} boxSize={6} />
        </Link>
        <Link href="https://www.instagram.com/icarodlima" target="_blank">
          <Icon as={FaInstagram} boxSize={6} />
        </Link>
        <Link href="mailto:3d.easylapse@gmail.com" target="_blank">
          <Icon as={FaEnvelope} boxSize={6} />
        </Link>
      </HStack>
    </VStack>
  );
}

export default Mid;
