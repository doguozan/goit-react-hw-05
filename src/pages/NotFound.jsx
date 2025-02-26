import styles from "./NotFound.module.css";

function NotFound() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.imageContainer}>
                    <img
                        width={300}
                        height={300}
                        src="https://i.imgur.com/qIufhof.png"
                        alt="404"
                        className={styles.image}
                    />
                </div>
                <div className={styles.textContainer}>
                    <h1 className={styles.title}>404</h1>
                    <p className={styles.text}>Page Not Found</p>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
