import { Container } from "@/components/Container/Container";
import colors from "@/consts/colors";
import Link from "next/link";
import styled from "styled-components";

export const WrapperHeader = styled(Container)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  padding-top: 26px;
  padding-bottom: 26px;
  padding: 26px 10px;

  background-color: ${colors.primary};
`;

export const LinkLogo = styled(Link)`
  margin: 0 auto;
`;

export const RightContainer = styled.div`
  display: flex;
  column-gap: 20px;
  margin-left: auto;
`;
