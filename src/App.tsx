import "./App.scss";
import { useEffect, useState } from "react";
import TopBar from "./components/TopBar";
import { DisplayMode } from "./types/settings";
import { fetchLanguages, fetchRepositories } from "./api/github";
import DataList from "./components/DataList";
import { Language, Repository } from "./types/repository";
import { getStarredRepositoriesData } from "./utils/storage";

function App() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [starredRepositories, setStarredRepositories] = useState<Repository[]>(
    getStarredRepositoriesData()
  );
  const [languages, setLanguages] = useState<Language[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [displayMode, setDisplayMode] = useState<DisplayMode>("all");
  const [isRepositoriesFetching, setIsRepositoriesFetching] = useState(false);

  const getRepositoriesData = async (language?: string) => {
    setIsRepositoriesFetching(true);
    try {
      const repositoriesData = await fetchRepositories(language);
      if (repositoriesData?.items) {
        setRepositories(repositoriesData.items);
      }
    } catch (error) {
      console.error("Error fetching repositories: ", error);
    } finally {
      setIsRepositoriesFetching(false);
    }
  };

  const getLanguagesData = async () => {
    try {
      const languagesData = await fetchLanguages();
      if (languagesData) {
        setLanguages(languagesData);
      }
    } catch (error) {
      console.error("Error fetching languages: ", error);
    }
  };

  useEffect(() => {
    getRepositoriesData();
    getLanguagesData();
  }, []);

  useEffect(() => {
    getRepositoriesData(selectedLanguage);
  }, [selectedLanguage]);

  return (
    <main className="container">
      <section className="context">
        <TopBar
          languages={languages}
          setDisplayMode={setDisplayMode}
          setSelectedLanguage={setSelectedLanguage}
        />
        <DataList
          repositories={repositories}
          starredRepositories={starredRepositories}
          displayMode={displayMode}
          setStarredRepositories={setStarredRepositories}
          isRepositoriesFetching={isRepositoriesFetching}
        />
      </section>
    </main>
  );
}

export default App;
