import { GroupHeader, GroupWrapper } from "./styled";

interface I_GroupProps {
  title: string;
  children: React.ReactElement;
}

const Group: React.FC<I_GroupProps> = ({ title, children }) => {
  return (
    <GroupWrapper>
      <GroupHeader>
        <h3>{title}</h3>
        <div>Больше</div>
      </GroupHeader>
      {children}
    </GroupWrapper>
  );
};

export default Group;
