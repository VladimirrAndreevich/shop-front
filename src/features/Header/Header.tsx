import Image from "next/image";
import { WrapperHeader } from "./styled";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <WrapperHeader>
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="Shop Logo"
          width={70}
          height={27}
          priority
        />
      </Link>
    </WrapperHeader>
  );
};

export default Header;
