import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import TopBar from "./topBar";
import BottomBar from "./BottomBar";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.left}>
        <TopBar />
        <div>
          <h1 className={styles.title}>
            Create <mark>EASY</mark>
            <br /> 3D Print Time-lapses!
          </h1>
          <p className={styles.subtitle}>
            Capture those fancy time-lapses of your 3D printings using just a
            phone!
          </p>
          <p className={styles.disclaimer}>
            3D EasyLapse has no user analytics tracking. No advertising plugins.
            No data upload to any server.
          </p>
          <div className={styles.appStoreBadges}>
            <Link
              href="https://play.google.com/store/apps/details?id=com.icarodlima.easylapse3d"
              target="_blank"
            >
              <Image
                alt="Android download button"
                width={215}
                height={64}
                src="android-badge.png"
              />
            </Link>
            <Link href="https://apps.apple.com/br/app" target="_blank">
              <Image
                alt="iOS download button"
                width={215}
                height={64}
                src="ios-badge.png"
              />
            </Link>
          </div>
        </div>
        <BottomBar />
      </div>
      <div className={styles.right} />
    </main>
  );
}
