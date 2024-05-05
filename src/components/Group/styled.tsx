import styled from "styled-components";

export const GroupWrapper = styled.div`
  &:not(:last-of-type) {
    margin-bottom: 60px;
  }
`;

export const GroupHeader = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 15px;
`;

export const Price = styled.p<{ $discounted?: boolean }>`
  text-decoration: ${(props) => (props.$discounted ? "line-through" : "")};
`;
