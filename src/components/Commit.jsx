import React from "react";
import { useLocation } from "react-router-dom";
//api
import { useFetchCommitsQuery } from "../app/project";
//컴포넌트
import CommitCard from "./CommitCard";

const Commit = ({ repoName }) => {
  const location = useLocation();
  const { org: orgName } = location.state;

  const { data: commits = [], isLoading } = useFetchCommitsQuery({
    orgName,
    repoName,
  });

  if (isLoading) {
    return <div>is Loading...</div>;
  }
  return (
    <div id="commit">
      <div className="commit__inner">
        <h3>Commits</h3>
        <hr />
        <div>
          {commits.map((commit, i) => (
            <a
              href={commit.html_url}
              target="_blank"
              rel="noopener noreferrer"
              key={i}
            >
              <CommitCard commit={commit} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Commit;
