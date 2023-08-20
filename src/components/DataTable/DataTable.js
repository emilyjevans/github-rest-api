import { DataGrid } from "@mui/x-data-grid";

export default function DataTable(commits) {
  console.log(commits);
  const formatCommits = commits.data.map((commit) => {
    const table = {};
    let id = 1;

    table.id = id;
    table.message = commit.commit.message;

    const dateTime = new Date(commit.commit.author.date);
    const formattedDateTime = dateTime.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    table.date = formattedDateTime;
    table.author = commit.author.login;
    id++;
    return table;
  });

  const columns = [
    { field: "date", headerName: "Date", width: 250 },
    { field: "message", headerName: "Message", width: 150 },
    { field: "author", headerName: "Author", width: 150 },
  ];
  return (
    <DataGrid
      rows={formatCommits}
      columns={columns}
      sx={{ backgroundColor: "#FFFFFF" }}
    />
  );
}
