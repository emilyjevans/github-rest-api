import "./App.css";
import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import { Octokit } from "octokit";
import Menu from "./components/Menu/Menu";
import { Grid, Button } from "@mui/material";

function App() {
  const [user, setUser] = useState("bbc");
  const [menuData, setMenuData] = useState([]);
  const [repo, setRepo] = useState(".github");
  const [commits, setCommits] = useState([
    {
      commit: { message: "blank", author: { date: "2021-12-16T10:05:52Z" } },
      author: { login: "Author" },
    },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await getReposForAUser(user);
    setMenuData(response);
  };

  const octokit = new Octokit({
    auth: process.env.REACT_APP_GITHUB_TOKEN,
  });

  async function getReposForAUser(searchInput) {
    const response = await octokit.request(`GET /users/${searchInput}/repos`, {
      username: { searchInput },
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    return response.data;
  }

  async function getCommitsForARepo(user, repo) {
    const response = await octokit.request(
      `GET /repos/${user}/${repo}/commits`,
      {
        owner: { user },
        repo: { repo },
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    return response.data;
  }

  useEffect(() => {
    async function getCommits(user, repo) {
      const response = await getCommitsForARepo(user, repo);
      setCommits(response);
    }
    getCommits(user, repo);
  }, [repo]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Find out the latest git commit!</h1>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 2 }}>
          <Grid item xs={1} sm={1}>
            <p>Enter a github user</p>
            <form onSubmit={handleSubmit}>
              <SearchBar user={user} setUser={setUser} sx={{ height: 50 }} />{" "}
              <Button variant="contained" type="submit" sx={{ height: 55 }}>
                Submit
              </Button>
            </form>
            {menuData.length > 0 && (
              <>
                <p>And choose a repo</p>
                <Menu
                  data={menuData}
                  repo={repo}
                  user={user}
                  setRepo={setRepo}
                  setCommits={setCommits}
                />
              </>
            )}
          </Grid>
          <Grid item xs={1} sm={1}>
            {repo !== "nc-giggle" && (
              <>
                <p>
                  Current Repo: <b>{repo}</b>
                </p>
                <p>
                  Latest commit is <br />
                  <i>"{commits[0].commit.message}"</i>
                </p>
                <p>
                  Author: <b>{commits[0].author.login}</b>
                </p>
                <p>
                  Date: <b>{commits[0].commit.author.date}</b>
                </p>
              </>
            )}
          </Grid>
        </Grid>
      </header>
    </div>
  );
}

export default App;
