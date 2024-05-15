import { Providers } from "./providers";

export const metadata = {
  metadataBase: new URL("https://3d-easylapse.github.io"),
  title: "3D EasyLapse",
  description:
    "3D EasyLapse - Capture those fancy time-lapses of your 3D printings using just a phone!",
  openGraph: {
    images: "/logo192.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
