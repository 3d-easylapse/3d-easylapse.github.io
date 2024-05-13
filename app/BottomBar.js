import Link from "next/link";
import styles from "./BottomBar.module.css";

function BottomBar() {
  return (
    <div className={styles.bottomBar}>
      <Link href="privacy-policy.html">Privacy Policy</Link>
    </div>
  );
}

export default BottomBar;
