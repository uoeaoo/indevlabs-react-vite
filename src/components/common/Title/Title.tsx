import styles from "./Title.module.css";

interface TitleProps {
  text: string;
  span: string;
}

const Title = ({ text, span }: TitleProps) => {
  return (
    <h1 className={styles.title}>
      {text}
      <span>{span}</span>
    </h1>
  );
};

export default Title;
