import Link from "next/link";
import { GroupHeader, GroupWrapper } from "./styled";
import { E_Type } from "@/types";

interface I_GroupProps {
  title: string;
  type: E_Type;
  children: React.ReactElement;
}

const Group: React.FC<I_GroupProps> = ({ title, type, children }) => {
  return (
    <GroupWrapper>
      <GroupHeader>
        <h3>{title}</h3>
        <Link href={`/products/catalog/${type}`}>Больше</Link>
      </GroupHeader>
      {children}
    </GroupWrapper>
  );
};

export default Group;
