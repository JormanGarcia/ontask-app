import { FC } from "react";
import styled from "styled-components";

const StyledSidebar = styled.aside`
  background-color: ${({ theme }) => theme.palette.sidebar};
  padding: 30px 30px 30px 30px;
  display: flex;
  flex-direction: column;
  transition: 0.2s;
`;

const ActionButtons = styled.div`
  display: flex;
`;

const Sidebar = ({ children }: { children: any }) => (
  <StyledSidebar>{children}</StyledSidebar>
);

Sidebar.ActionButtons = ActionButtons;

export default Sidebar;
