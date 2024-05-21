import { Language, RepositoriesData } from "../types/repository";

export const fetchLanguages = async (): Promise<Language[]> => {
  const response = await fetch(`https://api.github.com/languages`).then(
    (response) => response.json()
  );

  return response;
};

export const fetchRepositories = async (
  language?: string
): Promise<RepositoriesData> => {
  const lastWeekDate = new Date();
  lastWeekDate.setDate(lastWeekDate.getDate() - 7);
  const formattedDate = lastWeekDate.toISOString().split("T")[0];
  const formattedLanguage = language ? `language:"${language}"+` : "";

  const params = `?q=${formattedLanguage}created:>${formattedDate}&sort=stars&order=desc`;

  const response = await fetch(
    `https://api.github.com/search/repositories${params}`
  ).then((response) => response.json());

  return response;
};
