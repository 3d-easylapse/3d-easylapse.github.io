import { Center } from "@chakra-ui/react";

function Right() {
  return (
    <Center flexGrow={1} backgroundColor="teal.200">
      <video
        style={{
          maxHeight: "80vh",
          maskImage: "url(ios-app-mockup-mask.png)",
          maskSize: "contain",
          maskPosition: "center",
        }}
        autoPlay
        loop
        playsInline
        muted
        src="ios-app-mockup.mov"
      />
    </Center>
  );
}

export default Right;
