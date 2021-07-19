import React from "react";
import { NotesContextProvider } from "../../context/NotesContext";
import { useUserContext } from "../../context/UserContext";
import DefaulLayout from "./DefaulLayout";
import InLogginLayout from "./InLogginLayout";

const Layout: React.FC = ({ children }) => {
  const {
    state: { user },
  } = useUserContext();

  const CurrentLayout = user === null ? DefaulLayout : InLogginLayout;

  if (user !== null)
    return (
      <NotesContextProvider>
        <InLogginLayout>{children}</InLogginLayout>
      </NotesContextProvider>
    );

  return <DefaulLayout>{children}</DefaulLayout>;
};

export default Layout;
