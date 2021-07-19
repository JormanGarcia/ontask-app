import React, { useEffect } from "react";
import { useState } from "react";
import { FC } from "react";
import styled, { css } from "styled-components";
import { useThemeContext } from "../../context/ThemeContext";
import { Button } from "../core/Button";
import InputLabel from "../core/InputLabel";
import { Container } from "./Container";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Typography } from "../core/Typography";
import FlexSeparator from "../core/FlexSeparator";
import ThemeSwitcher from "./ThemeSwitcher";
import { useUserContext } from "../../context/UserContext";
import {
  NotesContextProvider,
  useNotesContext,
} from "../../context/NotesContext";
import Link from "next/link";
import { useMutationHook } from "../../hooks/useMutationHook";
import { getNoteGroups } from "../../utils/getNoteGroups";

const InLogginLayout: FC = ({ children }) => {
  const { refetch, notes, searchProps } = useNotesContext();
  const { toggleTheme, theme } = useThemeContext();
  const [search, setSearch] = useState("");

  const [groups, setGroups] = useState<string[]>([]);

  useEffect(() => {
    setGroups(getNoteGroups(notes));
  }, [notes]);

  console.log(groups);

  const {
    state: { user },
  } = useUserContext();

  const { AddNote } = useMutationHook();

  const addNoteHandler = async () => {
    await AddNote(user?._id!);
    refetch();
  };

  return (
    <>
      <Container>
        <Sidebar>
          <Typography align="center" variant="h1">
            OnTask
          </Typography>

          <Nav>
            <Typography link>
              <Link href="/notes/">All Notes</Link>
            </Typography>

            <Typography margin="20px 0 20px 0">All Groups</Typography>

            {groups.map((e) => (
              <Typography key={e} link>
                <Link href={"/notes/" + e}>{e}</Link>
              </Typography>
            ))}
          </Nav>
          <FlexSeparator />

          <Sidebar.ActionButtons>
            <Button
              onClick={() => {
                const nameGroup = prompt("Name of new Group", "");
                setGroups([...groups, nameGroup!]);
              }}
              grow
            >
              Add Group
            </Button>
          </Sidebar.ActionButtons>
        </Sidebar>
        <Main>
          <Navbar>
            <div>
              <Button marginRight={1} onClick={() => addNoteHandler()}>
                + Add Task
              </Button>
              <InputLabel {...searchProps} placeholder="Looking Something?" />
            </div>

            <div>
              <UserName>
                {user?.name.first || ""} {user?.name.last || ""}
              </UserName>
              <ThemeSwitcher theme={theme} onClick={() => toggleTheme()} />
            </div>
          </Navbar>

          {children}
        </Main>
      </Container>
    </>
  );
};

const Main = styled.main`
  overflow-y: auto;
  padding: 20px 40px 0 40px;
`;

const Nav = styled.div`
  margin-top: 200px;
`;

const UserName = styled(Typography)`
  ${({ theme }) =>
    theme.name === "dark" &&
    css`
      color: ${theme.palette.main.normal};
    `}
`;

export default InLogginLayout;
