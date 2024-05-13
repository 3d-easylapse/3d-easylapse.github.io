import Image from "next/image";
import styles from "./TopBar.module.css";

function TopBar() {
  return (
    <div className={styles.topBar}>
      <div className={styles.imageWrapper}>
        <Image
          fill
          src="logo192.png"
          alt="The website logo, a black 3D printer with a moving extruder. Behind the extruder there is a green shadow representing the extruder's previous position."
        />
      </div>
      <h3>3D EasyLapse</h3>
    </div>
  );
}

export default TopBar;
