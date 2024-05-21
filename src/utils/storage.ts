export const getStarredRepositoriesData = () => {
  const storedStarredRepositories = localStorage.getItem("starredRepositories");
  if (storedStarredRepositories) {
    return JSON.parse(storedStarredRepositories);
  }

  return [];
};
