import Image from "next/image";
import { WrapperFooter } from "./styled";

const Footer: React.FC = () => {
  return (
    <WrapperFooter>
      <Image
        src="/logo_gray.svg"
        alt="Shop Logo"
        width={70}
        height={27}
        priority
      />
    </WrapperFooter>
  );
};

export default Footer;
