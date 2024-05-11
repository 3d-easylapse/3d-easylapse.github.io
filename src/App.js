import React from 'react';
import {
  ChakraProvider,
  Text,
  VStack,
  theme,
  Heading,
  Mark,
  HStack,
  Image,
  Center,
  Flex,
  Link,
} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { FaYoutube, FaGithub, FaInstagram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Flex minHeight="100vh" flexWrap="wrap">
        <VStack flexGrow={1} gap={0} align="stretch" overflowX="clip">
          <HStack height={24} paddingLeft={4} gap={0}>
            <Image objectFit={'contain'} src="logo192.png" height={16} />
            <Heading as="h4" size="md">
              3D EasyLapse
            </Heading>
          </HStack>
          <Center flexGrow={1} paddingLeft={8} paddingRight={8}>
            <VStack spacing={8}>
              <Heading
                as="h1"
                size="4xl"
                textAlign={'center'}
                overflowWrap="break-word"
              >
                Create <Mark color="teal.500">EASY</Mark>
                <br />
                3D Print Time-lapses!
              </Heading>
              <Text fontSize="xl" textAlign="justify">
                Capture those fancy time-lapses of your 3D printings using just
                a phone!
              </Text>
              <Text fontSize="xs">
                3D EasyLapse has no user analytics tracking. No advertising
                plugins. No data upload to any server.
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
                    src="en_badge_web_generic.png"
                    alt="Google Play download button"
                  />
                </Link>
                <Link
                  flex={1}
                  onClick={() =>
                    alert(
                      'iOS app is under construction. Keep calm, we are almost there!'
                    )
                  }
                >
                  <Image
                    maxHeight={16}
                    objectFit="contain"
                    src="download-on-the-app-store-under-construction.png"
                    alt="App Store download button"
                  />
                </Link>
              </HStack>
              <HStack gap={4}>
                <Link href="https://youtube.com/@icarodlima" target="_blank">
                  <Icon as={FaYoutube} boxSize={6} />
                </Link>
                <Link
                  href="https://www.instagram.com/icarodlima/"
                  target="_blank"
                >
                  <Icon as={FaInstagram} boxSize={6} />
                </Link>
                <Link href="https://github.com/3d-easylapse" target="_blank">
                  <Icon as={FaGithub} boxSize={6} />
                </Link>
                <Link href="mailto:3d.easylapse@gmail.com" target="_blank">
                  <Icon as={MdEmail} boxSize={6} />
                </Link>
              </HStack>
            </VStack>
          </Center>
          <HStack height={24} justify={'center'}>
            <Link
              href="privacy-policy.html"
              target="_blank"
            >
              Privacy Policy
            </Link>
          </HStack>
        </VStack>

        <Center flexGrow={1} backgroundColor="teal.200">
          <video
            style={{
              maxHeight: '80vh',
              maskImage: 'url(ios-app-mockup-mask.png)',
              maskSize: 'contain',
              maskPosition: 'center',
            }}
            autoPlay
            loop
            playsInline
            muted
            src="ios-app-mockup.mov"
          />
        </Center>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
