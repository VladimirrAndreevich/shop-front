import Image from "next/image";
import { LinkLogo, RightContainer, WrapperHeader } from "./styled";
import userStore from "@/store/user-store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import Link from "next/link";

const Header: React.FC = observer(() => {
  const { initToken, isLogged } = userStore;

  useEffect(() => {
    initToken(localStorage.getItem("token"));
  }, []);

  return (
    <WrapperHeader as="header">
      <div></div>

      <LinkLogo href="/">
        <Image
          src="/logo.svg"
          alt="Shop Logo"
          width={70}
          height={27}
          priority
        />
      </LinkLogo>

      <RightContainer>
        {!isLogged && (
          <Link href="/user/register">
            <Image
              src="/icons/user.svg"
              alt="The icon of a star"
              width={20}
              height={25}
              priority
            />
          </Link>
        )}
        {isLogged && (
          <>
            <Link href="/user/favorites">
              <Image
                src="/icons/star.svg"
                alt="The icon of a star"
                width={20}
                height={25}
                priority
              />
            </Link>
            <Link href="/user/cart">
              <Image
                src="/icons/cart.svg"
                alt="The icon of a cart"
                width={20}
                height={25}
                priority
              />
            </Link>
          </>
        )}
      </RightContainer>
    </WrapperHeader>
  );
});

export default Header;
