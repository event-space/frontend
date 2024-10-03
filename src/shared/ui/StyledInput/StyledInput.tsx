import { Props } from './props';
import styles from './styles.module.scss';

function StyledInput({ placeholder, label, type }: Props) {
  return (
    <div>
      <label htmlFor="input" className={styles.input}>
        {label && <span>{label}</span>}
        <input type={type} id="input" placeholder={placeholder} />
      </label>
    </div>
  );
}

export default StyledInput;
