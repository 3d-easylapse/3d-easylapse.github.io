import { Providers } from "./providers";

export const metadata = {
  title: "3D EasyLapse",
  description:
    "3D EasyLapse - Capture those fancy time-lapses of your 3D printings using just a phone!",
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
