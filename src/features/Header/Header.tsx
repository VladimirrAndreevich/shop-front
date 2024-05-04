import Image from "next/image";
import { WrapperHeader } from "./styled";

const Header: React.FC = () => {
  return (
    <WrapperHeader>
      <Image src="/logo.svg" alt="Shop Logo" width={70} height={27} />
    </WrapperHeader>
  );
};

export default Header;
