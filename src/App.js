import "./App.css";
import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import { Octokit } from "octokit";
import Menu from "./components/Menu/Menu";
import { Grid, Button } from "@mui/material";
import DataTable from "./components/DataTable/DataTable";

function App() {
  const [user, setUser] = useState("emilyjevans");
  const [menuData, setMenuData] = useState([]);
  const [repo, setRepo] = useState("nc-giggle");
  const [commits, setCommits] = useState([
    {
      commit: {
        message: "",
        author: { date: "", name: "" },
      },
    },
  ]);
  const [pageState, setPageState] = useState("default");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await getReposForAUser(user);
      setMenuData(response);
    } catch {
      setPageState("error");
    }
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
        <h1>Find out the latest git commit history</h1>
        {pageState === "default" && (
          <Grid
            container
            spacing={{ xs: 2, sm: 3 }}
            columns={{ xs: 4, sm: 8 }}
            sx={{ p: 2 }}
          >
            <Grid item xs={4} sm={2}>
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
            <Grid item xs={4} sm={6}>
              {repo !== "nc-giggle" && <DataTable data={commits} />}
            </Grid>
          </Grid>
        )}
        {pageState === "error" && <p>Something went wrong</p>}
      </header>
    </div>
  );
}

export default App;
