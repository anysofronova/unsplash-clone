import styles from "./Socials.module.scss";

const Socials = () => {
  return (
    <div className={styles.socialContainer}>
      <a href="#" className={styles.social}>
        <i className="fab fa-facebook-f"></i>
      </a>
      <a href="#" className={styles.social}>
        <i className="fab fa-google-plus-g"></i>
      </a>
      <a href="#" className={styles.social}>
        <i className="fab fa-linkedin-in"></i>
      </a>
    </div>
  );
};

export default Socials;
