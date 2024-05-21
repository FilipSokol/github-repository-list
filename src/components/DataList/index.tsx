import "./styles.scss";
import { GithubOutlined, LoadingOutlined } from "@ant-design/icons";
import { DisplayMode } from "../../types/settings";
import { Repository } from "../../types/repository";
import ListItem from "../ListItem";

type Props = {
  displayMode: DisplayMode;
  repositories: Repository[];
  starredRepositories: Repository[];
  setStarredRepositories: React.Dispatch<React.SetStateAction<Repository[]>>;
  isRepositoriesFetching: boolean;
};

function DataList(props: Props) {
  const {
    displayMode,
    repositories,
    starredRepositories,
    setStarredRepositories,
    isRepositoriesFetching,
  } = props;

  const dataSource = displayMode === "all" ? repositories : starredRepositories;

  const handleStar = (repository: Repository) => {
    const index = starredRepositories.findIndex((s) => s.id === repository.id);
    if (index === -1) {
      const updatedStarredRepositories = [...starredRepositories, repository];
      setStarredRepositories(updatedStarredRepositories);
      localStorage.setItem(
        "starredRepositories",
        JSON.stringify(updatedStarredRepositories)
      );
    } else {
      const updatedStarredRepositories = [...starredRepositories];
      updatedStarredRepositories.splice(index, 1);
      setStarredRepositories(updatedStarredRepositories);
      localStorage.setItem(
        "starredRepositories",
        JSON.stringify(updatedStarredRepositories)
      );
    }
  };

  if (isRepositoriesFetching) {
    return (
      <section className="loader">
        <LoadingOutlined className="loaderIcon" spin />
      </section>
    );
  }

  if (!dataSource.length) {
    return (
      <section className="noData">
        <GithubOutlined />
        <span>No data</span>
      </section>
    );
  }

  return (
    <section className="list">
      {dataSource.map((repository: Repository) => {
        const isStarred = starredRepositories.some(
          (s) => s.id === repository.id
        );

        return (
          <ListItem
            key={repository.id}
            data={repository}
            isStarred={isStarred}
            handleStar={handleStar}
          />
        );
      })}
    </section>
  );
}

export default DataList;
