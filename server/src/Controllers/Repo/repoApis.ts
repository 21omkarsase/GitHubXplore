import axios from "axios";

export const fetchUserPublicRepos = async (username: string): Promise<{}[] | null> => {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`);

        return response.data;
    } catch (error) {
        return null;
    }
}

export const fetchUserStarredRepos = async (username: string): Promise<{}[] | null> => {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}/starred`);

        return response.data;
    } catch (error) {
        return null;
    }
}

export const fetchSingleRepo = async (username: string, reponame: string): Promise<{}[] | null> => {
    try {
        const response = await axios.get(`https://api.github.com/repos/${username}/${reponame}`);

        return response.data;
    } catch (error) {
        return null;
    }
}

export const fetchRepoCommits = async (username: string, reponame: string): Promise<{}[] | null> => {
    try {
        const response = await axios.get(`https://api.github.com/repos/${username}/${reponame}/commits`);

        return response.data;
    } catch (error) {
        return null;
    }
}

export const fetchRepoContributors = async (username: string, reponame: string): Promise<{}[] | null> => {
    try {
        const response = await axios.get(`https://api.github.com/repos/21omkarsase/Bootstrap/contributors`);

        return response.data;
    } catch (error) {
        return null;
    }
}

export const fetchRepoLanguages = async (username: string, reponame: string): Promise<{}[] | null> => {
    try {
        const response = await axios.get(`https://api.github.com/repos/${username}/${reponame}/languages`);

        return response.data;
    } catch (error) {
        return null;
    }
}
