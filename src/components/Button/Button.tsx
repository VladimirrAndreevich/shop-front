import { Btn } from "./styled";

type ButtonProps = {
  children: string | React.ReactNode;
  clickHandler?: () => void;
};

const Button: React.FC<ButtonProps> = ({ children, clickHandler }) => {
  return <Btn onClick={clickHandler}>{children}</Btn>;
};

export default Button;
