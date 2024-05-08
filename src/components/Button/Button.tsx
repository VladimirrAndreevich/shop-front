import { Btn } from "./styled";

type ButtonProps = {
  children: string | React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ children }) => {
  return <Btn>{children}</Btn>;
};

export default Button;
