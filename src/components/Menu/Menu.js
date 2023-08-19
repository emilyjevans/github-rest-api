import * as React from "react";
import List from "@mui/material/List";
import MenuItem from "@mui/material/MenuItem";
import { Paper } from "@mui/material";
import { Octokit } from "octokit";

export default function Menu({ data, user, setRepo, setCommits }) {
  const octokit = new Octokit({
    auth: process.env.REACT_APP_GITHUB_TOKEN,
  });

  async function handleClick(e) {
    const repo = e.currentTarget.textContent;
    setRepo(repo);
  }

  return (
    <Paper
      style={{
        maxHeight: 200,
        overflow: "auto",
        maxWidth: 400,
        alignContent: "center",
        margin: "auto",
      }}
    >
      <List>
        {data.map((option) => (
          <MenuItem key={option.name} value={option.name} onClick={handleClick}>
            {option.name}
          </MenuItem>
        ))}
      </List>
    </Paper>
  );
}
