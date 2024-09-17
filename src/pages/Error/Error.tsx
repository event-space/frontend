import styles from './style.module.scss';

export default function Error() {
  return (
    <section className={styles.notFound}>
      <div className="container">
        <div className={styles.notfound__wrapper}>
          <h1>Cтраница не найдена</h1>
        </div>
      </div>
    </section>
  );
}
